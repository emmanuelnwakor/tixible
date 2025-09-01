import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";

const projects = [
  { id: "p1", title: "Vibin — Music App", desc: "Personalized discovery, offline listening, artist promos and campus features." },
  { id: "p2", title: "Tixible Learn — AI Tutoring", desc: "Adaptive quizzes, past questions, offline packs and progress dashboards." },
  { id: "p3", title: "Core AI — Assistant", desc: "Localised assistant for study help, content generation and productivity flows." },
  { id: "p4", title: "CutLab — Mobile Editor", desc: "Quick templates and export presets for creators (coming soon)." },
  { id: "p5", title: "Zyro — Productivity (On hold)", desc: "Notes → tasks → study cards — future integration with Core AI." },
  { id: "p6", title: "Portfolio & Dev Log", desc: "See our roadmap, dev logs and team updates." },
];

const features = [
  { title: "Mobile-first", text: "Optimised for low-end devices and low-data connections." },
  { title: "AI-powered", text: "Practical AI that improves study outcomes and discovery." },
  { title: "Made in Africa", text: "Built with local context, language and exams in mind." },
];

const testimonials = [
  { name: "Amina Yusuf", role: "Student, Lagos", text: "Tixible Learn made WAEC revision sensible. The AI explanations actually help." },
  { name: "David Chukwu", role: "Campus Creator", text: "Vibin is giving local artists real space. Smooth app, love the discovery features." },
  { name: "Grace Ade", role: "Teacher, Abuja", text: "Finally an edtech that understands offline needs — Tixible is practical and thoughtful." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" }
  }),
};

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [newsletterState, setNewsletterState] = useState({ status: "idle", message: "" });
  const [contactState, setContactState] = useState({ status: "idle", message: "" });
  const navPanelRef = useRef(null);

  // SEO Meta (keeps your meta tags)
  useEffect(() => {
    document.title = "Tixible — Innovating Tomorrow, Today";
    const metas = [
      { name: "description", content: "Tixible builds simple, AI-powered apps for learning, music, and everyday life in Africa." },
      { name: "keywords", content: "education, music, AI, low-data, Tixible" },
      { property: "og:title", content: "Tixible — Innovating Tomorrow, Today" },
      { property: "og:description", content: "AI-powered learning and discovery tools designed for Africa." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://i.postimg.cc/qvXVFdrv/Chat-GPT-Image-Aug-7-2025-04-31-04-PM.png" },
    ];
    metas.forEach(({ name, property, content }) => {
      let el = document.querySelector(name ? `meta[name="${name}"]` : `meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (name) el.setAttribute("name", name);
        if (property) el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });
  }, []);

  // Close nav with Escape and trap a bit of behavior for a11y
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && navOpen) setNavOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  // Helpers: smooth-scroll to contact
  function scrollToContact() {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  }

  // Handlers
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.elements["email"]?.value;
    if (!email) return;
    setNewsletterState({ status: "sending", message: "" });
    setTimeout(() => {
      setNewsletterState({ status: "success", message: "Thanks — you’re on the waitlist!" });
      e.target.reset();
    }, 600);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const { name, email, message } = e.target.elements;
    if (!name.value || !email.value || !message.value) {
      setContactState({ status: "error", message: "Please fill all fields." });
      return;
    }
    setContactState({ status: "sending", message: "" });
    setTimeout(() => {
      setContactState({ status: "success", message: "Message sent — we will reply soon." });
      e.target.reset();
    }, 800);
  }

  return (
    <div className="app-root">
      {/* Skip link for keyboard users */}
      <a href="#maincontent" className="sr-only">Skip to content</a>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-overlay ${navOpen ? "show" : ""}`}
        onClick={() => setNavOpen(false)}
        aria-hidden={!navOpen}
      />

      {/* Header */}
      <header className="header" role="banner">
        <div className="container header-inner">
          <div className="brand">
            <div className="logo-icon" aria-hidden="true">T</div>
            <div>
              <div className="logo-text">Tixible</div>
              <div className="small">Innovating Tomorrow, Today</div>
            </div>
          </div>

          <nav className="nav" role="navigation" aria-label="Primary navigation">
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#testimonials">Testimonials</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>

          <div className="actions">
            <button
              className="cta-btn"
              onClick={scrollToContact}
              aria-label="Join beta — contact us"
            >
              Join Beta
            </button>

            <button
              className="mobile-nav"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={navOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setNavOpen(!navOpen)}
            >
              <span aria-hidden="true">{navOpen ? "✕" : "☰"}</span>
              <span className="sr-only">{navOpen ? "Close navigation" : "Open navigation"}</span>
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div
          id="mobile-nav-panel"
          ref={navPanelRef}
          className={`nav-panel ${navOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="false"
        >
          <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setNavOpen(false)}>About</a>
          <a href="#testimonials" onClick={() => setNavOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => { setNavOpen(false); scrollToContact(); }}>Contact</a>
        </div>
      </header>

      {/* Main */}
      <main id="maincontent">
        {/* Hero */}
        <section className="hero" id="home">
          <div className="container hero-inner">
            <div className="hero-left">
              <motion.h1
                className="hero-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                Build. Learn. Vibin. — <span className="accent-learn">Tixible</span>
              </motion.h1>

              <motion.p className="hero-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.12 }}>
                We build AI-powered, mobile-first apps that help students learn smarter,
                creators publish faster, and everyday users get more done — even on low-data phones.
              </motion.p>

              <div className="hero-cta">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="cta-btn primary"
                  onClick={scrollToContact}
                  aria-label="Get early access — join waitlist"
                >
                  Get Early Access
                </motion.button>
                <a className="small link" href="#projects">View Projects →</a>
              </div>

              <motion.div className="features" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {features.map((f, i) => (
                  <motion.div key={i} className="feature" variants={fadeUp} custom={i + 1}>
                    <h4>{f.title}</h4>
                    <p className="small">{f.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Newsletter inline */}
              <form className="newsletter-inline" onSubmit={handleNewsletterSubmit} aria-label="Subscribe to Tixible newsletter">
                <input name="email" type="email" placeholder="your@email.com" required aria-label="Email address for newsletter" />
                <button type="submit" className="cta-btn" aria-label="Join waitlist">Join Waitlist</button>
                <div className={`form-note ${newsletterState.status}`} role="status" aria-live="polite">{newsletterState.message}</div>
              </form>
            </div>

            <motion.aside className="card hero-preview" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}>
              <img
                src="https://i.postimg.cc/FKPsd24g/Chat-GPT-Image-Sep-1-2025-10-08-48-PM.png"
                alt="Tixible app preview on a mobile device"
                loading="lazy"
                width="320"
                height="600"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </motion.aside>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section container" aria-labelledby="projects-heading">
          <div className="section-header">
            <h2 id="projects-heading">Projects</h2>
            <div className="small">Focused on education, music, and AI</div>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                className="project-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ scale: 1.03 }}
                aria-labelledby={`${p.id}-title`}
              >
                <h5 id={`${p.id}-title`}>{p.title}</h5>
                <p className="small">{p.desc}</p>
                <button
                  className="submit"
                  onClick={scrollToContact}
                  aria-label={`Join beta for ${p.title}`}
                >
                  Join Beta
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section container" aria-labelledby="testimonials-heading">
          <div className="section-header">
            <h2 id="testimonials-heading">What People Are Saying</h2>
            <div className="small">Early impressions from students, creators and teachers</div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="card testimonial"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i }}
                whileHover={{ translateY: -6 }}
                aria-label={`${t.name} testimonial`}
              >
                <p className="small quote">“{t.text}”</p>
                <div className="testimonial-meta small"><strong>{t.name}</strong> — <span>{t.role}</span></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter large */}
        <section className="section container newsletter-large" aria-labelledby="newsletter-heading">
          <div className="section-header">
            <h2 id="newsletter-heading">Stay in the loop</h2>
            <div className="small">Join early access and receive product updates.</div>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit} aria-label="Join the Tixible waitlist">
            <input name="email" type="email" placeholder="Enter your email" required aria-label="Email address" />
            <button type="submit" className="cta-btn primary" aria-label="Join waitlist button">Join Waitlist</button>
          </form>
          <div className={`form-note ${newsletterState.status}`} role="status" aria-live="polite">{newsletterState.message}</div>
        </section>

        {/* About */}
        <section id="about" className="section container" aria-labelledby="about-heading">
          <h2 id="about-heading">About Tixible</h2>
          <p className="small">Tixible exists to reimagine access to opportunity across Africa by building elegant, locally-aware digital products that make learning, creating, and everyday life dramatically easier.</p>
          <p className="small">Our mission is to design and scale mobile-first apps that solve real, measurable problems for youth, creators and learners — using practical AI, human-centered design and low-data engineering.</p>
        </section>

        {/* Contact */}
        <section id="contact" className="section container" aria-labelledby="contact-heading">
          <div className="section-header">
            <h2 id="contact-heading">Contact & Join Beta</h2>
            <div className="small">Want to partner, hire us, or join the beta? Drop a message and we'll reply.</div>
          </div>
          <div className="contact-grid">
            <div className="card contact-card">
              <h3>Let’s build something great</h3>
              <p className="small">Send a message and we’ll reply via email.</p>
              <form onSubmit={handleContactSubmit} className="contact-form" aria-label="Contact form">
                <input id="name" name="name" type="text" placeholder="Your name" required aria-label="Your name" />
                <input id="email" name="email" type="email" placeholder="you@example.com" required aria-label="Your email" />
                <textarea id="message" name="message" placeholder="Tell us about your idea or partnership" required aria-label="Message content" />
                <button type="submit" className="submit" aria-label="Send message">Send message</button>
                <div className={`form-note ${contactState.status}`} role="status" aria-live="polite">{contactState.message}</div>
              </form>
            </div>

            <div className="aside-column" aria-hidden="false">
              <div className="card">
                <div className="small"><strong>Email</strong><br /><a href="mailto:infotixible@gmail.com">infotixible@gmail.com</a></div>
                <div className="small" style={{ marginTop: 12 }}><strong>Location</strong><br />Abuja, Nigeria</div>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <div className="text-sm small">Follow</div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <a className="outline-btn" href="#" rel="noopener noreferrer">GitHub</a>
                  <a className="outline-btn" href="#" rel="noopener noreferrer">Twitter</a>
                  <a className="outline-btn" href="#" rel="noopener noreferrer">LinkedIn</a>
                  <a className="outline-btn" href="#" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <div className="container footer-grid">
            <div className="footer-col">
              <img src="https://i.postimg.cc/qvXVFdrv/Chat-GPT-Image-Aug-7-2025-04-31-04-PM.png" alt="Tixible Logo" style={{ width: 100, marginBottom: 12 }} />
              <p className="small">Smart, affordable digital tools for learning, music, and everyday life.</p>
            </div>

            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#projects">Our Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <div className="socials">
                <a href="#">Twitter</a>
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
                
        {/* Floating contact button (final-touch idea) */}
        <button
          className="floating-contact"
          aria-label="Open contact section"
          onClick={scrollToContact}
          title="Contact us"
        >
          ✉
        </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom small">© {new Date().getFullYear()} Tixible. All rights reserved.</div>
        </footer>

      </main>
    </div>
  );
}
