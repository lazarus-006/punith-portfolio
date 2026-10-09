import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Braces, CheckCheck, CloudSun, Code2, Github, GraduationCap, Linkedin, Menu, Monitor, Server, Wrench, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroArt from '@/assets/chrome-ribbon.jpg';

const githubUrl = "https://github.com/lazarus-006";
const linkedinUrl = "https://www.linkedin.com/in/punith-kumar-6569a6328/";
function useAccessibleMotion() {
  const preference = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(Boolean(preference)), [preference]);
  return reduced;
}
const profiles = [
  { name: 'GitHub', handle: 'lazarus-006', url: 'https://github.com/lazarus-006', icon: Github },
  { name: 'LinkedIn', handle: 'Let’s connect', url: 'https://www.linkedin.com/in/punith-kumar-6569a6328/', icon: Linkedin },
  { name: 'LeetCode', handle: 'Punith_kumar_2006', url: 'https://leetcode.com/u/Punith_kumar_2006/', icon: Code2 },
];
const navigation = ['About', 'Skills', 'Projects', 'Journey', 'Contact'];
const skills = [
  { name: 'Frontend', description: 'Exploring the craft of practical, interactive web experiences.', icon: Monitor },
  { name: 'Backend', description: 'Developing an understanding of what happens behind the interface.', icon: Server },
  { name: 'Tools & workflow', description: 'Building a thoughtful approach to creating and improving projects.', icon: Wrench },
  { name: 'Programming', description: 'Practicing problem-solving and strengthening the fundamentals.', icon: Braces },
];
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useAccessibleMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useAccessibleMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }); const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return <motion.div style={{ x: sx, y: sy }} onPointerMove={e => { if (reduced || e.pointerType !== 'mouse') return; const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left - rect.width / 2) * .12); y.set((e.clientY - rect.top - rect.height / 2) * .15); }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
function Cursor() {
  const reduced = useAccessibleMotion(); const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 24 }); const sy = useSpring(y, { stiffness: 180, damping: 24 });
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const move = (e: PointerEvent) => { x.set(e.clientX - 12); y.set(e.clientY - 12); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move); document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, [reduced, x, y]);
  return visible && !reduced ? <motion.div aria-hidden="true" className="cursor-ring" style={{ x: sx, y: sy }} /> : null;
}
function SocialLinks() { return <>{profiles.map(({ name, url, icon: Icon }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon /></a>)}</>; }
export function Portfolio() {
  const reduced = useAccessibleMotion();
  const [intro, setIntro] = useState(true); const [menu, setMenu] = useState(false); const [active, setActive] = useState(''); const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll(); const artY = useTransform(scrollY, [0, 900], [0, 110]);
  useEffect(() => { const timer = window.setTimeout(() => setIntro(false), reduced ? 0 : 900); return () => window.clearTimeout(timer); }, [reduced]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25); onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-20% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  return <>
    <AnimatePresence>{intro && !reduced && <motion.div className="intro" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: .45 }}><div className="intro-text">Welcome to my world<span>.</span></div></motion.div>}</AnimatePresence>
    <Cursor />
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}><div className="shell nav-inner">
      <a className="monogram" href="#home" aria-label="Punith Kumar M home">PKM<span>.</span></a>
      <nav aria-label="Main navigation" id="main-navigation" className={`nav-links ${menu ? 'mobile-open' : ''}`}>{navigation.map(name => <a key={name} href={`#${name.toLowerCase()}`} className={active === name.toLowerCase() ? 'active' : ''} aria-current={active === name.toLowerCase() ? 'location' : undefined} onClick={() => setMenu(false)}>{name}</a>)}</nav>
      <div className="nav-actions"><Button asChild variant="outline" className="nav-contact"><a href="#contact">Let’s talk <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="main-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
    </div></header>
    <main>
      <section className="hero" id="home">
        <motion.img className="hero-art" src={heroArt} width={1920} height={1088} alt="Sculptural titanium ribbon with electric blue reflections" fetchPriority="high" style={{ y: reduced ? 0 : artY }} />
        <div className="shell hero-inner"><motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: reduced ? 0 : 1 }}>
          <div className="availability"><span className="status-dot" /> Open to internship opportunities</div>
          <p className="hero-name">Hey, I’m <strong>Punith Kumar M</strong> <span aria-hidden="true">↗</span></p>
          <h1>Building Digital<br />Experiences,<br /><span>One Line at a Time.</span></h1>
          <p className="hero-description">An aspiring full-stack developer with a curious mind.<br className="hidden md:block" /> Learning, experimenting, and building practical,<br className="hidden md:block" /> interactive experiences for the web.</p>
          <div className="hero-buttons"><Magnetic><Button asChild variant="portfolio" size="lg"><a href="#projects">Explore My Work <ArrowUpRight /></a></Button></Magnetic><Magnetic><Button asChild variant="outline" size="lg"><a href="#contact">Contact Me <ArrowRight /></a></Button></Magnetic></div>
          <div className="hero-socials"><span className="social-rule" /><SocialLinks /></div>
        </motion.div></div>
        <div className="shell hero-bottom"><a href="#about" className="scroll-link"><ArrowDown size={15} /> SCROLL TO EXPLORE</a><span>CURIOUS MIND. BUILDER AT HEART.</span></div>
      </section>
      <section id="about" className="section"><div className="shell about-layout"><Reveal><div className="section-label">01 / A little about me</div><h2>Driven by curiosity.<br /><span>Growing through code.</span></h2><p className="section-intro">Not an expert in everything.<br />Always a student of something.</p></Reveal><Reveal delay={.15} className="about-copy"><p>I’m <strong>Punith Kumar M</strong>, an aspiring full-stack developer who enjoys turning ideas into practical web experiences.</p><p>Right now, I’m strengthening my web development skills: learning the fundamentals, experimenting with ideas, and approaching problems one step at a time. For me, every project is a chance to understand a little more.</p><p>I’m looking for an <strong>internship opportunity</strong> where I can contribute, learn from a team, and keep growing as a developer.</p><div className="about-detail"><GraduationCap size={25} /><div><strong>Learning with intention</strong><span>Web development · Problem-solving · Building</span></div></div></Reveal></div></section>
      <section id="skills" className="section"><div className="shell"><Reveal className="section-heading"><div><div className="section-label">02 / Learning & skills</div><h2>My growing <span>toolkit.</span></h2></div><p className="section-intro">The areas I’m developing.<br />Specific technologies will be added once confirmed.</p></Reveal><div className="skills-grid">{skills.map(({ name, description, icon: Icon }, i) => <Reveal key={name} delay={i * .07} className="skill-card"><Icon className="skill-icon" size={26} /><h3>{name}</h3><p>{description}</p><span className="learning-label">LEARNING FOCUS</span></Reveal>)}</div></div></section>
      <section id="projects" className="section"><div className="shell"><Reveal className="section-heading"><div><div className="section-label">03 / Selected work</div><h2>Ideas becoming <span>experiences.</span></h2></div><Button asChild variant="ghost"><a href={githubUrl} target="_blank" rel="noopener noreferrer">Visit my GitHub <ArrowUpRight /></a></Button></Reveal><div className="projects-grid">{[{ title: 'Weather Now', icon: CloudSun, number: '01' }, { title: 'Task Manager', icon: CheckCheck, number: '02' }].map(({ title, icon: Icon, number }, i) => <Reveal key={title} delay={i * .1} className="project-card"><div className="project-art"><span className="project-corner">PROJECT / {number}</span><Icon aria-hidden="true" /><span className="project-status">DETAILS TO BE CONFIRMED</span></div><div className="project-info"><div className="project-title"><h3>{title}</h3><span>TO BE ADDED</span></div><p>A space reserved for this project. Its story, technologies, repository, and live demo will be shared when the details are confirmed.</p><div className="project-note">Project preview coming later — no demo available yet.</div></div></Reveal>)}</div></div></section>
      <section id="journey" className="section"><div className="shell journey-layout"><Reveal><div className="section-label">04 / The journey</div><h2>Small steps.<br /><span>Continuous progress.</span></h2><p className="section-intro">Learning isn’t a straight line. It’s a process of asking questions, trying things, and showing up again.</p></Reveal><div>{[{ step: 'THE FOUNDATION', title: 'Understanding the fundamentals', copy: 'Strengthening my web development knowledge and learning how the pieces fit together.' }, { step: 'THE PRACTICE', title: 'Learning by doing', copy: 'Experimenting, solving problems, and building projects to turn understanding into experience.' }, { step: 'THE NEXT CHAPTER', title: 'Growing with a team', copy: 'Looking for an internship to contribute to real work, learn from others, and develop further.' }].map((item, i) => <Reveal key={item.step} delay={i * .08} className="timeline-item"><small>{item.step}</small><h3>{item.title}</h3><p>{item.copy}</p></Reveal>)}</div></div></section>
      <section id="profiles" className="section"><div className="shell"><Reveal className="section-heading"><div><div className="section-label">05 / Around the internet</div><h2>Let’s <span>connect.</span></h2></div><p className="section-intro">A little more of my world, beyond this page.</p></Reveal><div className="profiles-grid">{profiles.map(({ name, handle, url, icon: Icon }, i) => <Reveal key={name} delay={i * .08}><a className="profile-link" href={url} target="_blank" rel="noopener noreferrer"><Icon /><div><h3>{name}</h3><p>{handle}</p></div><ArrowUpRight className="external" /></a></Reveal>)}</div></div></section>
      <section id="contact" className="section contact-section"><Reveal className="shell"><div className="section-label">06 / What’s next?</div><h2>Great things start with<br /><span>a conversation.</span></h2><p>Have an internship opportunity, an idea to explore, or just want to say hello? I’d love to hear from you.</p><Magnetic><Button asChild variant="portfolio" size="lg"><a href={linkedinUrl} target="_blank" rel="noopener noreferrer">Let’s talk on LinkedIn <ArrowUpRight /></a></Button></Magnetic><span className="contact-note">OPEN TO LEARNING. READY TO CONTRIBUTE.</span></Reveal></section>
    </main>
    <footer className="shell footer"><a className="monogram" href="#home" aria-label="Back to home">PKM<span>.</span></a><small>© {new Date().getFullYear()} Punith Kumar M. Crafted with curiosity.</small><div className="footer-right"><SocialLinks /><Button asChild variant="ghost" size="icon"><a href="#home" aria-label="Back to top" title="Back to top"><ArrowUp /></a></Button></div></footer>
  </>;
}
