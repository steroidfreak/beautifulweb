import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Showcase from './components/Showcase.jsx';
import Testimonials from './components/Testimonials.jsx';
import CallToAction from './components/CallToAction.jsx';
import Footer from './components/Footer.jsx';

const featureList = [
  {
    title: 'Adaptive Personalization',
    description: 'Intelligent defaults and automations that tune themselves to every visitor without extra work.',
    icon: '01'
  },
  {
    title: 'Insightful Analytics',
    description: 'Unified dashboards that surface the signals that matter with zero noise or busywork.',
    icon: '02'
  },
  {
    title: 'Effortless Workflows',
    description: 'Powerful building blocks that connect your tools so your team can create in minutes, not weeks.',
    icon: '03'
  }
];

const showcaseItems = [
  {
    title: 'Composable Blocks',
    description: 'Drag, drop, and publish. Compose whole experiences from modular building blocks.',
    imageAlt: 'Composable dashboard'
  },
  {
    title: 'Conversation Engine',
    description: 'Delight visitors with AI-guided experiences anchored to your own knowledge base.',
    imageAlt: 'AI conversation flow'
  },
  {
    title: 'Unified Feedback',
    description: 'Capture qualitative insights everywhere and route them to the teammates who can act.',
    imageAlt: 'Feedback board'
  }
];

const testimonials = [
  {
    quote: '"BeautifulWeb turned our static site into a conversion engine overnight."',
    name: 'Lara Chen',
    role: 'Head of Growth, Orbital'
  },
  {
    quote: '"The motion design feels alive. Our team ships updates faster than ever."',
    name: 'Amir Khan',
    role: 'Product Lead, Mosaic'
  },
  {
    quote: '"Finally a platform my designers and engineers both love using."',
    name: 'Vanessa Ruiz',
    role: 'Founder, Lumi Labs'
  }
];

const App = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <Hero />
      <Features features={featureList} />
      <Showcase items={showcaseItems} />
      <Testimonials testimonials={testimonials} />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default App;
