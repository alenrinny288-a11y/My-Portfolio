import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDownRight, ArrowUpRight, Menu, Moon, MoveRight, Sun, X } from 'lucide-react'
import leadManagementDashboard from './assets/lead-management-dashboard.png'
import kdsOrderDisplay from './assets/kds-order-display.png'
import './styles.css'

const projects = [
  { number: '01', title: 'KITCHEN DISPLAY SYSTEM', displayTitle: 'KITCHEN DISPLAY SYSTEM', type: 'Kitchen operations · Order management', description: 'Designed an interface to simplify recipe costing, ingredient management, and cost analysis by 25%.', className: 'noma' },
  { number: '02', title: 'PMS PORTAL', displayTitle: 'PMS PORTAL', type: 'Hospitality · Product design', description: 'Designed PMS software UI in Figma, focusing on Housekeeping, Laundry, Food Costing and HR payroll, within a comprehensive portal that also includes Front Office, POS, Accounting, and Inventory modules.', className: 'nourish' },
  { number: '03', title: 'LEAD MANAGEMENT PORTAL', displayTitle: 'LEAD MANAGEMENT PORTAL', type: 'Business software · Workflow design', description: 'Streamlined lead workflows, improving team productivity by 60%.', behanceUrl: 'https://www.behance.net/gallery/257855083/Lead-Management-Portal-UI-UX-Design', className: 'offgrid' },
  { number: '04', title: 'POINT OF SALE MOBILE APP', displayTitle: 'POINT OF SALE MOBILE APP', type: 'Mobile app · Checkout & inventory', description: 'Simplified checkout and inventory tracking, increasing efficiency by 30%.', className: 'noma' },
  { number: '05', title: 'HOSINSPIRE WEBSITE', displayTitle: 'HOSINSPIRE WEBSITE', type: 'Responsive website · UI design', description: 'Designed responsive UI, improving user engagement by 45%.', className: 'nourish' },
  { number: '06', title: 'ANNUAL MAINTENANCE CONTRACT PORTAL', displayTitle: 'ANNUAL MAINTENANCE CONTRACT PORTAL', type: 'Service management · Product design', description: 'Built a service-management interface, improving operational efficiency by 30%.', className: 'offgrid' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('alen-theme') === 'dark')
  const workRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    let frame
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('alen-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const goToWork = () => workRef.current?.scrollIntoView({ behavior: 'smooth' })
  return <main>
    <header className="nav wrap">
      <a className="brand" href="#top">Alen<span>Rinny.</span></a>
      <nav className="desktop-nav"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} onClick={() => setIsDark(!isDark)}>{isDark ? <Sun size={16}/> : <Moon size={16}/>}</button>
      <button className="contact-btn desktop-nav" onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>Let's talk <ArrowUpRight size={15}/></button>
      <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}><a onClick={() => setMenuOpen(false)} href="#work">Work</a><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a></motion.div>}</AnimatePresence>
    </header>

    <section id="top" className="hero wrap">
      <motion.h1 initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:.2}}>Alen Rinny</motion.h1>
      <motion.p className="hero-role" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.28}}>UI/UX · Product Designer</motion.p>
      <motion.p className="hero-subtitle" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.34}}>I craft digital experiences with meaning.</motion.p>
      <motion.div className="hero-bottom" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.35}}>
        <p>UI/UX designer based in India,<br/>shaping clear, human-first products<br/>for ambitious people and brands.</p>
        <button className="round-arrow" onClick={goToWork} aria-label="Explore selected work"><ArrowDownRight size={25}/></button>
      </motion.div>
      <div className="portrait" aria-label="Abstract editorial portrait of Alen Rinny"><div className="portrait-glow"/><div className="portrait-head"/><div className="portrait-neck"/><div className="portrait-shirt"/><div className="portrait-hair"/></div>
    </section>

    <section id="work" ref={workRef} className="work wrap">
      <div className="section-head"><p className="eyebrow">Selected work <span>— 06</span></p><h2>Recent <i>projects</i></h2></div>
      <div className="project-grid">
        {projects.map((project, index) => <motion.article key={project.title} className={`project-card ${project.className} ${project.title.includes('PORTAL') || project.title === 'HOSINSPIRE WEBSITE' ? 'desktop-project' : ''} ${project.title === 'LEAD MANAGEMENT PORTAL' ? 'has-dashboard' : ''} ${project.title === 'KITCHEN DISPLAY SYSTEM' ? 'kitchen-display' : ''}`} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.2}} transition={{delay:index*.1}} onClick={() => setActiveProject(project)}>
          <div className="project-visual"><div className={`device one ${project.title === 'LEAD MANAGEMENT PORTAL' ? 'dashboard-device' : ''} ${project.title === 'KITCHEN DISPLAY SYSTEM' ? 'kds-device' : ''}`}>{project.title === 'LEAD MANAGEMENT PORTAL' && <img src={leadManagementDashboard} alt="Lead Management Portal dashboard interface"/>}{project.title === 'KITCHEN DISPLAY SYSTEM' && <img src={kdsOrderDisplay} alt="Kitchen Display System order screen"/>}</div><div className="device two"/><div className="device-copy">{project.displayTitle}</div></div>
          <div className="project-info"><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.type}</p></div><ArrowUpRight size={19}/></div>
        </motion.article>)}
      </div>
    </section>

    <section id="about" className="about"><div className="wrap about-inner"><p className="eyebrow">About me <span>— 01</span></p><div><h2>Design is how I turn<br/>complexity into <i>clarity.</i></h2><p className="about-copy">For the past two years, I’ve partnered with startups and growing brands to create considered digital experiences. My approach blends strategy, visual thinking and an unapologetic love for the little details.</p><a className="text-link" href="#contact">More about me <MoveRight size={18}/></a></div></div></section>

    <section className="services wrap"><div className="section-head"><p className="eyebrow">What I do <span>— 02</span></p><h2>Ways I can <i>help.</i></h2></div><div className="service-list">{['Product design','Web design','Design systems'].map((service, i)=><div className="service" key={service}><span>0{i+1}</span><h3>{service}</h3><p>{i === 0 ? 'From early concepts to polished product interfaces.' : i === 1 ? 'Distinctive digital homes built around your audience.' : 'Flexible foundations that help your team move faster.'}</p><ArrowUpRight size={21}/></div>)}</div></section>

    <footer id="contact" className="footer"><div className="wrap"><p className="eyebrow">Have a project in mind?</p><h2>Let's make something<br/><i>memorable.</i></h2><div className="email-list"><a href="mailto:alenrinny288@gmail.com" className="email">alenrinny288@gmail.com <ArrowUpRight size={20}/></a><a href="mailto:alenrinny@zohomail.in" className="email">alenrinny@zohomail.in <ArrowUpRight size={20}/></a></div><div className="footer-bottom"><span>© 2026 Alen Rinny</span><span>Available for select projects</span><a href="#top">Back to top ↑</a></div></div></footer>

    <AnimatePresence>{activeProject && <motion.div className="modal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setActiveProject(null)}><motion.div className="modal" initial={{scale:.96,y:15}} animate={{scale:1,y:0}} exit={{scale:.96,y:15}} onClick={e=>e.stopPropagation()}><button onClick={() => setActiveProject(null)}><X size={20}/></button><p className="eyebrow">Case study — {activeProject.number}</p><h2>{activeProject.title}</h2><p>{activeProject.description}</p>{activeProject.behanceUrl && <a className="case-study-link" href={activeProject.behanceUrl} target="_blank" rel="noreferrer">See Case study in Behance <ArrowUpRight size={17}/></a>}</motion.div></motion.div>}</AnimatePresence>
  </main>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
