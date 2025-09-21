import { useEffect, useMemo, useRef, useState } from "react";

const buildHistoryPayload = (messages) =>
  messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({ role: message.role, content: message.content }));

const SourcesList = ({ sources }) => {
  if (!Array.isArray(sources) || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 rounded-lg bg-slate-800/60 p-3 text-xs text-slate-300">
      <p className="font-semibold uppercase tracking-wide text-slate-400">Sources</p>
      <ul className="mt-1 space-y-1">
        {sources.map((source) => (
          <li key={source.id} className="leading-snug">
            <span className="font-medium text-slate-200">{source.source}</span>
            {typeof source.score === "number" && (
              <span className="ml-1 text-slate-500">
                ({source.score.toFixed(2)})
              </span>
            )}
            {source.snippet && (
              <div className="mt-1 text-slate-400">
                {source.snippet}
                {source.snippet.length >= 280 && "..."}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const alignment = message.role === "user" ? "items-end" : "items-start";
  const bubbleStyles =
    message.role === "user"
      ? "bg-blue-500 text-white"
      : "bg-slate-800 text-slate-100 border border-slate-800/60";

  return (
    <div className={`flex ${alignment}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${bubbleStyles}`}>
        <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
        {message.role === "assistant" && <SourcesList sources={message.sources} />}
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const placeholder = useMemo(
    () =>
      "Ask anything about BeautifulWeb or the knowledge base. Try: \"What is the best way to onboard a new teammate?\"",
    []
  );

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setError(null);
  };

  const sendMessage = async () => {
    const trimmed = draft.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const historyPayload = buildHistoryPayload(messages);
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historyPayload })
      });

      if (!response.ok) {
        throw new Error("The assistant could not be reached.");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.reply || "I'm not sure how to respond yet.",
          sources: Array.isArray(data.sources) ? data.sources : []
        }
      ]);
    } catch (err) {
      console.error("[chat-widget] failed to send message", err);
      setError(err.message || "Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "I hit an error contacting the AI assistant. Please try again shortly."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/95 shadow-2xl backdrop-blur">
          <header className="flex items-center justify-between border-b border-slate-800/60 bg-slate-900/70 px-5 py-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">BeautifulWeb Copilot</p>
              <p className="text-xs text-slate-500">Powered by OpenAI + your knowledge base</p>
            </div>
            <button
              type="button"
              onClick={toggleOpen}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800/60 hover:text-slate-200"
              aria-label="Close chat"
            >
              x
            </button>
          </header>

          <div ref={scrollRef} className="flex h-96 flex-col space-y-4 overflow-y-auto bg-slate-950 px-5 py-4">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 p-4 text-sm text-slate-400">
                <p className="font-medium text-slate-300">Welcome!</p>
                <p className="mt-2 leading-relaxed">
                  This copilot can answer questions about your workspace files. Drop notes into
                  <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5">backend/knowledge-base</code>
                  and they'll be used as context.
                </p>
              </div>
            ) : (
              messages.map((message) => <MessageBubble key={message.id} message={message} />)
            )}
          </div>

          {error && (
            <div className="mx-5 mb-3 rounded-lg border border-red-600/30 bg-red-600/10 px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-slate-800/60 bg-slate-900/60 px-5 py-4">
            <label htmlFor="chat-widget-input" className="sr-only">
              Send a message
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="chat-widget-input"
                className="h-20 w-full resize-none rounded-2xl border border-slate-800/80 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                placeholder={placeholder}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-500/60"
                disabled={isLoading || !draft.trim()}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center gap-3 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
        aria-expanded={isOpen}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
          AI
        </span>
        <span>{isOpen ? "Close" : "AI Copilot"}</span>
      </button>
    </div>
  );
};

export default ChatWidget;
