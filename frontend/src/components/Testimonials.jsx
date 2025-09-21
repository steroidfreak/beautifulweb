import { motion } from 'framer-motion';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.h2
        className="text-center text-3xl font-bold text-white sm:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        Teams shipping experiences users love
      </motion.h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.blockquote
            key={testimonial.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-indigo-900/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <p className="text-slate-200">{testimonial.quote}</p>
            <footer className="mt-6 text-sm text-slate-400">
              <span className="block font-semibold text-white">{testimonial.name}</span>
              {testimonial.role}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
