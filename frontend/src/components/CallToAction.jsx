import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section id="cta" className="px-6 pb-24">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-blue-500/20 px-10 py-12 text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2 className="text-3xl font-semibold text-white">Ready to orchestrate experiences at scale?</h2>
          <p className="mt-3 text-slate-200">
            Connect BeautifulWeb to your stack, import your knowledge, and spin up immersive journeys with AI assistance built in.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <a
            href="mailto:hello@beautifulweb.ai"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            Talk with an expert
          </a>
          <a
            href="/api/hello"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition-colors hover:text-white"
          >
            Test the live API
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
