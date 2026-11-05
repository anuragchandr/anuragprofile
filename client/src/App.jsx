import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig, useScroll, useSpring, useInView, animate } from 'framer-motion';
import './theme';
import portfolio from './data/portfolio';
import TicTacToe from './components/TicTacToe';
import ChatWidget from './components/chat/ChatWidget';
import ThemeToggle from './components/ThemeToggle';
import LiveStats from './components/LiveStats';
import './site.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const NAV = ['about', 'skills', 'projects', 'journey', 'play', 'contact'];
const TECH_LOGOS = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const Reveal = ({ children, delay = 0, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
);

const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="section">
    <Reveal><p className="kicker">{kicker}</p><h2>{title}</h2></Reveal>
    {children}
  </section>
);

function useTypewriter(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    let w = 0, c = 0, del = false, t;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let wait = del ? 35 : 75;
      if (!del && c === word.length) { del = true; wait = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
      t = setTimeout(tick, wait);
    };
    tick();
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

function Stat({ value, suffix = '', prefix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const a = animate(0, value, { duration: 1.6, onUpdate: (v) => setN(Math.round(v)) });
    return () => a.stop();
  }, [inView, value]);
  return <div ref={ref} className="stat"><b>{prefix}{n}{suffix}</b><span>{label}</span></div>;
}

function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const submit = async (e) => {
    e.preventDefault(); setState('sending');
    try {
      const r = await fetch(`${API}/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      setState(r.ok ? 'sent' : 'error');
      if (r.ok) setF({ name: '', email: '', message: '' });
    } catch { setState('error'); }
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <form className="form" onSubmit={submit}>
      <input required placeholder="Your name" value={f.name} onChange={set('name')} />
      <input required type="email" placeholder="Your email" value={f.email} onChange={set('email')} />
      <textarea required rows={4} placeholder="Your message" value={f.message} onChange={set('message')} />
      <button className="btn" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
      {state === 'sent' && <p className="ok">Thanks! Your message is in.</p>}
      {state === 'error' && <p className="err">Couldn't send. Please email me directly.</p>}
    </form>
  );
}

function NotFoundPage() {
  return (
    <main className="section not-found-wrap">
      <Reveal className="card not-found-card">
        <p className="kicker">404</p>
        <h2>Page not found</h2>
        <p className="body">The page you were looking for does not exist.</p>
        <div className="cta">
          <a className="btn" href="/">Back home</a>
        </div>
      </Reveal>
    </main>
  );
}

export default function App() {
  const p = portfolio;
  const typed = useTypewriter(p.roles);
  const [active, setActive] = useState('');
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    window.addEventListener('popstate', syncPath);
    return () => { io.disconnect(); window.removeEventListener('popstate', syncPath); };
  }, []);

  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const allowedRoutes = new Set(['/', '/about', '/skills', '/projects', '/journey', '/play', '/contact']);
  if (!allowedRoutes.has(normalizedPath)) {
    return <NotFoundPage />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="orb o1" /><div className="orb o2" />

      <nav className="nav">
        <a href="#top" className="logo">AC<span>.</span></a>
        <div>{NAV.map((n) => <a key={n} href={`#${n}`} className={active === n ? 'act' : ''}>{n}</a>)}<ThemeToggle /></div>
      </nav>

      <header id="top" className="hero">
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Hi, I'm</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>{p.name}</motion.h1>
        <motion.p className="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>I <em>{typed}</em><i className="caret" /></motion.p>
        <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{p.summary}</motion.p>
        <motion.div className="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <a className="btn" href="#projects">View projects</a>
          <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
          <a className="btn ghost" href="#play">Play a game</a>
        </motion.div>
      </header>

      <main>
        <Section id="about" kicker="01 · About" title="Engineer by training, builder by habit">
          <div className="two">
            <Reveal>{p.about.map((t) => <p key={t} className="body">{t}</p>)}</Reveal>
            <div className="stats">{p.stats.map((s) => <Reveal key={s.label}><Stat {...s} /></Reveal>)}</div>
          </div>
          <LiveStats />
        </Section>

        <Section id="skills" kicker="02 · Skills" title="The toolbox">
          <div className="grid3">
            {Object.entries(p.skills).map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="card">
                <h3>{k}</h3>
                <div className="tags">{v.map((s) => <span key={s}>{s}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </Section>

        <div className="section tech-showcase">
          <div className="logo-row logo-row--icons">
            {TECH_LOGOS.map(({ name, src }) => (
              <img key={name} src={src} alt={name} title={name} className="logo-badge" />
            ))}
          </div>
        </div>

        <Section id="projects" kicker="03 · Projects" title="Things I've built">
          <div className="projects">
            {p.projects.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 0.08} className="card project">
                <p className="tag">{pr.tag}</p>
                <h3>{pr.title}</h3>
                <ul>{pr.points.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="tags">{pr.stack.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="cta project-actions">
                  {pr.github && <a className="btn ghost sm" href={pr.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                  {pr.demo && <a className="btn sm" href={pr.demo} target="_blank" rel="noreferrer">Deployment ↗</a>}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="journey" kicker="04 · Journey" title="Education, roles & wins">
          <div className="two">
            <div className="timeline">
              {p.journey.map((j, i) => (
                <Reveal key={j.title} delay={i * 0.08} className="tl">
                  <small>{j.when}</small><h3>{j.title}</h3><p>{j.place}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="card">
              <h3>Achievements</h3>
              <ul className="plain">{p.achievements.map((a) => <li key={a}>🏆 {a}</li>)}</ul>
              <h3 style={{ marginTop: 20 }}>Certifications</h3>
              <ul className="plain">{p.certifications.map((a) => <li key={a}>✔ {a}</li>)}</ul>
            </Reveal>
          </div>
        </Section>

        <Section id="play" kicker="05 · Play" title="Beat my tic-tac-toe AI">
          <Reveal><p className="body center">Hard mode never loses, so a draw is a win. This board talks to a swappable game service, ready to be wired to a backend built for massive concurrency.</p></Reveal>
          <Reveal><TicTacToe /></Reveal>
        </Section>

        <Section id="contact" kicker="06 · Contact" title="Let's build something">
          <div className="two">
            <Reveal>
              <p className="body">Hiring for AI/ML or backend, or just want to talk systems? Send a message, or ask my assistant in the corner.</p>
              <div className="cta">
                <a className="btn" href={p.links.email}>Email me</a>
                <a className="btn ghost" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="btn ghost" href={p.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </Reveal>
            <Reveal><ContactForm /></Reveal>
          </div>
        </Section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} {p.name} · Built with React</footer>
      <ChatWidget />
    </MotionConfig>
  );
}