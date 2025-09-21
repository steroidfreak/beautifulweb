import { motion } from 'framer-motion';

const Showcase = ({ items }) => {
  return (
    <section className="bg-slate-900/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Showcase the craft</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Launch multi-sensory storytelling with layered motion, dynamic content, and AI that keeps every experience in sync.
          </p>
        </motion.div>
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-xl shadow-indigo-900/20 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              <div className="h-40 rounded-2xl bg-gradient-to-br from-indigo-500/40 via-sky-400/20 to-blue-500/30 ring-1 ring-white/10" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-300">{item.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-300">
                {item.imageAlt}
                <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
