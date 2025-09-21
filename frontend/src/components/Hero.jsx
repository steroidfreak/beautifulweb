import { motion } from 'framer-motion';

const gradientButtonClasses =
  'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-transform duration-300 hover:scale-105 hover:shadow-indigo-400/40';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial opacity-90 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-32 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
            Crafted for visionary teams
          </span>
        </motion.div>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9 }}
        >
          Design. Ship. Grow. A single platform for high-velocity experience teams.
        </motion.h1>
        <motion.p
          className="text-lg text-slate-300 md:max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          BeautifulWeb stitches content, data, and motion into unified customer journeys. Launch campaigns, iterate instantly, and uncover what resonates - without touching code.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <a href="#cta" className={gradientButtonClasses}>
            <span>Start your free pilot</span>
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
          >
            See how teams scale
            <span aria-hidden="true">-&gt;</span>
          </a>
        </motion.div>
        <motion.div
          className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          <div className="grid grid-cols-2 gap-4 text-left text-sm text-slate-200 md:grid-cols-4">
            <div>
              <p className="text-2xl font-semibold text-white">+47%</p>
              <p>Pipeline lift in the first quarter</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white"><span className="align-top text-base">&lt;</span>7d</p>
              <p>Average time-to-launch campaigns</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">98%</p>
              <p>Customer satisfaction across touchpoints</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p>Proactive monitoring & support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
