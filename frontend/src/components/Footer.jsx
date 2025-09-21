const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950/80 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">BeautifulWeb</p>
          <p className="text-sm text-slate-400">Crafted for creative, AI-native customer journeys.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#cta" className="transition hover:text-white">Pricing</a>
          <a href="mailto:hello@beautifulweb.ai" className="transition hover:text-white">Support</a>
        </div>
        <p className="text-xs text-slate-500">Copyright {year} BeautifulWeb Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
