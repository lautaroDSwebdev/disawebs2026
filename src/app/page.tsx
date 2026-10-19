"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iconMap } from "./const/mock";
import { siteData } from "./const/data";
import { Code2 } from "lucide-react";
import SimbolMove from "./components/SimbolMove";
import Contact from "./components/Contact";
import Services from "./components/Services";
import { Home, Briefcase, FolderGit2, User, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { label: "Inicio", href: "inicio", icon: <Home size={16} /> },
    { label: "Servicios", href: "servicios", icon: <Briefcase size={16} /> },
    { label: "Portfolio", href: "portfolio", icon: <FolderGit2 size={16} /> },
    { label: "Sobre mí", href: "sobre-mi", icon: <User size={16} /> },
    { label: "Contacto", href: "contacto", icon: <Mail size={16} /> },
  ];

  // function Icon({ name = "", size = 20, strokeWidth = 1.8 }) {
  //   const IconComponent = iconMap[name] || Code2;
  //   return (
  //     <IconComponent size={size} strokeWidth={strokeWidth} aria-hidden="true" />
  //   );
  // }

  const [activeSection, setActiveSection] = useState("");

  // Scroll spy: detecta la sección activa
  useEffect(() => {
    const handleScroll = () => {
      for (let i = siteData.navigation.length - 1; i >= 0; i--) {
        const section = document.getElementById(siteData.navigation[i].href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 560) {
            setActiveSection(siteData.navigation[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animaciones GSAP para textos y secciones principales
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada inicial del Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("nav", { y: -30, opacity: 0, duration: 1 })
        .from(".hero-title", { scale: 0.9, opacity: 0, duration: 1.2 }, "-=0.6")
        .from(
          ".hero-subtitle",
          { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 },
          "-=0.8",
        )
        .from(".hero-image", { y: 50, opacity: 0, duration: 1 }, "-=0.6");

      // Animaciones al hacer scroll en las secciones principales
      const sections = gsap.utils.toArray<HTMLElement>(
        ".section, .contact-section",
      );
      sections.forEach((section) => {
        gsap.from(
          section.querySelectorAll(
            ".section-heading, .about-content, .contact-copy, .portfolio-grid",
          ),
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="app" id="inicio" ref={containerRef}>
      {/* Acá empieza el header */}
      <section className="relative min-h-screen w-full bg-[#090b0f] text-white flex flex-col justify-between overflow-hidden px-6 md:px-12 py-6">
        {/* Fondo con degradado radial sutil */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 25%, #37d67a 0%, #090b0f 75%)",
          }}
        />

        {/* Navbar flotante superior */}
        <nav className="fixed z-30 flex justify-center w-full left-0 right-0 ">
          <ul className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm shadow-lg">
            {navigation.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <li key={item.href} className="flex items-center">
                  <div>{item.icon}</div>
                  <a
                    href={`#${item.href}`}
                    className={`hover-underline-animation ${
                      isActive ? "left text-white" : ""
                    } flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-colors text-zinc-400 hover:text-white text-xs`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-7xl mx-auto h-[65vh] md:h-[83vh]">
          <h1 className="hero-title absolute lg:text-[168px] font-black tracking-tighter text-[#37d67a] select-none text-center leading-none z-10 pointer-events-none whitespace-nowrap top-1/2 -translate-y-1/2 opacity-90">
            DISAWebs©
          </h1>

          <div className="absolute inset-x-0 top-[calc(50%+90px)] md:top-[calc(50%+110px)] z-30 flex justify-between items-start px-4 md:px-12 pointer-events-none">
            <p className="hero-subtitle max-w-[220px] md:max-w-xs text-xs md:text-sm text-zinc-200 leading-relaxed pointer-events-auto drop-shadow-md">
              Hola, soy Lautaro. Creador de sitios web profesionales asistido
              por Inteligencia Artificial.
            </p>
            <p className="hero-subtitle max-w-[220px] md:max-w-xs text-xs md:text-sm text-zinc-200 text-right leading-relaxed pointer-events-auto hidden md:block drop-shadow-md">
              Transformo ideas en experiencias digitales rápidas, modernas y
              totalmente personalizadas.
            </p>
          </div>

          <div className="hero-image absolute z-20 bottom-0 w-72 md:w-[420px] lg:w-[480px] h-[400px] rounded-2xl md:h-[520px] lg:h-[580px] overflow-hidden flex items-end justify-center pointer-events-none">
            <img
              src="/my-photo-without-bg.png"
              alt="Lautaro Di Salvo"
              className="w-full h-full object-cover object-top mask-image-gradient"
            />
          </div>
        </div>

        <div className="relative z-30 flex justify-between items-center text-xs md:text-sm text-zinc-400 mt-auto ">
          <p>© DISAWebs 2026</p>
          <span className="text-zinc-500">(Scroll down)</span>
        </div>
      </section>

      <div className="stats">
        <div className="stats-inner">
          {siteData.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="servicios" className="section">
        <div className="section-heading">
          <p className="eyebrow">{siteData.services.sectionLabel}</p>
          <h2>{siteData.services.title}</h2>
          <p>{siteData.services.description}</p>
        </div>
        <Services></Services>
      </section>

      <section id="portfolio" className="section portfolio-section">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="eyebrow">{siteData.portfolio.sectionLabel}</p>
            <h2>{siteData.portfolio.title}</h2>
          </div>
          <p>{siteData.portfolio.description}</p>
        </div>

        <div className="portfolio-grid">
          {siteData.portfolio.projects.map((project) => (
            <article className="project-card" key={project.id}>
              <a
                className="project-image"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visitar ${project.data}`}
              >
                <img src={project.img} alt={`Vista previa de ${project.img}`} />
                <span className="project-view">
                  Ver página{" "}
                  {/* <Icon name={siteData.icons.externalLink} size={16} /> */}
                </span>
              </a>
              <div className="project-body">
                <h3>{project.data}</h3>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  {project.href}
                  {/* <Icon name={siteData.icons.externalLink} size={16} /> */}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre-mi" className="section about-section">
        <SimbolMove>
          <div className="about-photo">
            <img
              src={siteData.about.photo.src}
              alt={siteData.about.photo.alt}
            />
          </div>
        </SimbolMove>

        <div className="about-content">
          <p className="eyebrow">{siteData.about.sectionLabel}</p>
          <h2>{siteData.about.title}</h2>
          {siteData.about.paragraphs.map((paragraph) => (
            <p className="about-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <div className="highlight-list">
            {siteData.about.highlights.map((highlight) => (
              <div className="highlight" key={highlight}>
                <span>
                  {/* <Icon name={siteData.icons.check} size={14} /> */}
                </span>
                <p>{highlight}</p>
              </div>
            ))}
          </div>

          <a
            className="button button-secondary cv-button"
            href={siteData.about.cv.href}
            target="_blank"
            rel="noreferrer"
          >
            {/* <Icon name={siteData.icons.fileText} size={18} /> */}
            {siteData.about.cv.label}
          </a>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-inner">
          <div className="contact-copy">
            <p className="eyebrow">{siteData.contact.sectionLabel}</p>
            <h2>{siteData.contact.title}</h2>
            <p>{siteData.contact.description}</p>
          </div>

          <div className="">
            <div className="parent">
              <div className="card">
                <div className="glass"></div>
                <div className="content">
                  <span className="title">Contacto</span>
                  <span className="text">Mis redes de contacto</span>
                </div>
                <Contact></Contact>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a className="brand" href="#inicio">
            <span className="brand-mark"></span>
            <span>{siteData.brand.name}</span>
          </a>
          <p>{siteData.footer.text}</p>
        </div>
        <p>{siteData.footer.copyright}</p>
      </footer>
    </div>
  );
}

export default App;
