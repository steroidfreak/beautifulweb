import { motion } from 'framer-motion';

const Features = ({ features }) => {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center md:text-left">
        <motion.h2
          className="text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Built to empower whole teams
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-slate-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          BeautifulWeb brings the elegance of modern product design with the control you expect from enterprise platforms. Every workspace is secure, flexible, and ready for scale.
        </motion.p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 shadow-lg shadow-indigo-900/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-slate-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
