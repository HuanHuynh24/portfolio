"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Film,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plane,
  FileText,
  CircleDot,
  X,
} from "lucide-react";
import { profile } from "./profile";

const socials = [
  {
    label: "GH:",
    text: "/HuanHuynh24",
    href: "https://github.com/HuanHuynh24",
  },
  {
    label: "FB:",
    text: "Huỳnh Ngọc Huân",
    href: "https://www.facebook.com/huynh.huan.967/",
  },
  {
    label: "TT:",
    text: "@ngochuan_02",
    href: "https://www.tiktok.com/@ngochuan_02",
  },
];
function Star({ className = "" }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true" />;
}
function Navigation({ hero = false }: { hero?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`navigation ${hero ? "navigation-hero" : ""}`}>
      <a className="brand" href="#top" aria-label="Huân Huỳnh — home">
        <Star />
        Huân Huỳnh
      </a>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls={hero ? "hero-nav" : "about-nav"}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id={hero ? "hero-nav" : "about-nav"}
        className={`nav-links ${open ? "is-open" : ""}`}
        aria-label={hero ? "Main navigation" : "About navigation"}
      >
        <a href="#about" onClick={() => setOpen(false)}>
          About me
        </a>
        <a href="#experience" onClick={() => setOpen(false)}>
          Work
        </a>
        <a
          className="contact-button"
          href={`mailto:${profile.email}`}
          onClick={() => setOpen(false)}
        >
          Get in touch!
        </a>
      </nav>
    </header>
  );
}
export default function Home() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".introduction > *, .profile-photo, .contact-card, .resume h2, .timeline article, .skills-columns > div, .pill-group, .approach-columns > div, .interest-grid > div, .site-footer",
      ),
    );
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      elements.forEach((element) => {
        element.classList.remove("motion-pending", "motion-enter");
        element.style.removeProperty("--motion-delay");
      });
    };
    const start = () => {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove("motion-pending");
            entry.target.classList.add("motion-enter");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -24px 0px" },
      );

      elements.forEach((element) => {
        // Keep content already on screen visible, including after anchor navigation.
        if (element.getBoundingClientRect().top < window.innerHeight - 24)
          return;
        const siblings = Array.from(element.parentElement?.children ?? []);
        const order = Math.max(0, siblings.indexOf(element));
        element.style.setProperty(
          "--motion-delay",
          `${Math.min(order, 3) * 65}ms`,
        );
        element.classList.add("motion-pending");
        observer?.observe(element);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      clear();
      preference.removeEventListener("change", start);
    };
  }, []);

  return (
    <main>
      <section className="hero" id="top" aria-labelledby="portfolio-title">
        <Navigation hero />
        <div className="hero-composition">
          <div className="hero-photo">
            <img
              src="/avatar-1.png"
              alt="Huỳnh Ngọc Huân bên cầu Rồng, Đà Nẵng về đêm"
              width={1254}
              height={1254}
              fetchPriority="high"
            />
            <Star className="photo-star-large" />
            <Star className="photo-star-small" />
            <Star className="photo-star-bottom" />
          </div>
          <h1 id="portfolio-title">PORTFOLIO</h1>
          <div className="portfolio-echo" aria-hidden="true">
            <span>PORTFOLIO</span>
            <span>PORTFOLIO</span>
            <span>PORTFOLIO</span>
          </div>
          <div className="hero-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("https:") ? "_blank" : undefined}
                rel="me noopener noreferrer"
              >
                <b>{s.label}</b> {s.text}
              </a>
            ))}
          </div>
          <p className="hero-note">
            WordPress Developer & Tech Lead.
            <br />
            3+ years building websites, optimizing performance and SEO, and
            deploying reliable web systems. 10+ client websites delivered.
          </p>
        </div>
        <a className="scroll-down" href="#about">
          <span>
            Scroll
            <br />
            down
          </span>
          <ArrowDown size={18} />
        </a>
      </section>
      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-content page-width">
          <div className="introduction">
            <h2 id="about-title">
              Hello,
              <br />
              I’m Huân!
            </h2>
            <p>
              I am a WordPress Developer and Tech Lead based in Da Nang, Viet
              Nam, with 3+ years of experience. At Webtop, I build WordPress,
              WooCommerce and Next.js websites, optimize performance and SEO,
              and deploy reliable systems on VPS infrastructure.
            </p>
            <div
              className="cv-links"
              role="group"
              aria-label="Xem CV theo ngôn ngữ"
            >
              <a
                className="profile-link"
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xem CV tiếng Việt (PDF, mở trong tab mới)"
              >
                <FileText size={18} />
                <span>CV · Tiếng Việt</span>
                <ArrowUpRight size={18} />
              </a>
              <a
                className="profile-link"
                href="/CV-English.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View English CV (PDF, opens in a new tab)"
                lang="en"
              >
                <FileText size={18} />
                <span>CV · English</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="profile">
            <div className="profile-photo">
              <img
                src="/avatar-cutout.png"
                alt="Portrait of Huân"
                width={1254}
                height={1254}
              />
              <span className="profile-badge role-badge">Tech Lead</span>
              <span className="profile-badge nationality-badge">
                24 Feb 2004
              </span>
            </div>
            <address className="contact-card" id="contact">
              <h3>Contact</h3>
              <p>
                <MapPin />
                <span>{profile.location}</span>
              </p>
              <a href={`mailto:${profile.email}`}>
                <Mail />
                <span>{profile.email}</span>
              </a>
              <a href={profile.phoneHref}>
                <Phone />
                <span>{profile.phone}</span>
              </a>
              <a
                href={profile.website}
                target="_blank"
                rel="me noopener noreferrer"
              >
                <Globe2 />
                <span>huandev.io.vn</span>
              </a>
            </address>
          </div>
        </div>
      </section>
      <section className="resume" aria-label="Résumé">
        <div className="resume-grid page-width">
          <div className="resume-left">
            <section
              className="education"
              id="education"
              aria-labelledby="education-title"
            >
              <h2 id="education-title">Education</h2>
              <div className="timeline">
                <article>
                  <Star />
                  <h3>
                    2022
                    <br />
                    –2026
                  </h3>
                  <div>
                    <h4>{profile.university}</h4>
                    <p>{profile.major}</p>
                  </div>
                </article>
              </div>
            </section>
            <section
              className="experience"
              id="experience"
              aria-labelledby="experience-title"
            >
              <h2 id="experience-title">Experience</h2>
              <div className="timeline">
                <article>
                  <Star />
                  <h3>
                    2022
                    <br />
                    –Now
                  </h3>
                  <div>
                    <h4>{profile.company}</h4>
                    <p className="experience-role">{profile.title}</p>
                    <ul className="experience-details">
                      {profile.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
              <div className="pill-group values">
                <span>#Teamwork</span>
                <span>#Project-management</span>
                <span>#Problem-solving</span>
                <span>#Communication</span>
              </div>
            </section>
            <section className="activities" aria-labelledby="research-title">
              <h2 id="research-title">Research projects</h2>
              <div className="timeline">
                {profile.research.map((project) => (
                  <article key={project.start}>
                    <Star />
                    <h3>
                      {project.start}
                      <br />–{project.end}
                    </h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <div className="resume-right">
            <div className="resume-echo" aria-hidden="true">
              <span>RESUME</span>
              <span>RESUME</span>
              <span>RESUME</span>
            </div>
            <section
              className="technical-skills"
              id="expertise"
              aria-labelledby="skills-title"
            >
              <h2 id="skills-title">Technical skills</h2>
              <div className="skills-columns">
                <div>
                  <h3>Development</h3>
                  <div className="coding-list">
                    {profile.development.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Deployment</h3>
                  <div className="coding-list">
                    {profile.infrastructure.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="skill-detail">
                <h3>SEO & Analytics</h3>
                <p>{profile.seo.join(" · ")}</p>
              </div>
              <div className="skill-detail">
                <h3>Tools</h3>
                <p>{profile.tools.join(" · ")}</p>
              </div>
              <div className="pill-group specialties">
                <span>WordPress</span>
                <span>WooCommerce</span>
                <span>Performance & SEO</span>
                <span>VPS deployment</span>
              </div>
            </section>
            <section className="working-style" aria-labelledby="approach-title">
              <h2 id="approach-title">Career goals</h2>
              <p className="career-goal">
                Continue growing as a Tech Lead, contribute to high-quality web
                projects and deliver practical value for businesses through
                stable, user-friendly and search-friendly systems.
              </p>
            </section>
            <section className="interests" aria-labelledby="interests-title">
              <h2 id="interests-title">Things I enjoy</h2>
              <div className="interest-grid">
                <div>
                  <Film />
                  <p>
                    Watching
                    <br />
                    movies
                  </p>
                </div>
                <div>
                  <Code2 />
                  <p>
                    Exploring
                    <br />
                    new technology
                  </p>
                </div>
                <div>
                  <Plane />
                  <p>
                    Travel
                    <br />& discovery
                  </p>
                </div>
                <div>
                  <CircleDot />
                  <p>
                    Playing
                    <br />
                    football
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <footer className="site-footer page-width">
        <span>© {new Date().getFullYear()} Huỳnh Ngọc Huân</span>
        <a href="#top">
          Back to top <ArrowUpRight size={15} />
        </a>
      </footer>
    </main>
  );
}
