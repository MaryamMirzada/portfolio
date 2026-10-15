import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import maryam_img from "../assets/maryam_img.png";

const translations = {
  en: {
    welcome: "WELCOME TO MY PORTFOLIO",
    greeting: "Hello, I'm",
    name: "Maryam Mirzada",
    explore: "Explore More",
    whatIDo: "WHAT I DO",
    description:
      "Turning ideas into beautiful, responsive, and user-friendly digital solutions.",
    creative: "Creative",
    roles: ["Front-End Developer", "Digital Marketer", "Creative Developer"],
    aboutMe: "ABOUT ME",
  },

  fs: {
    welcome: "به پورتفولیوی من خوش آمدید",
    greeting: "سلام، من",
    name: "مریم میرزاده",
    explore: "بیشتر بدانید",
    whatIDo: "فعالیت‌های من",
    description:
      "ایده‌ها را به راهکارهای دیجیتالی زیبا، واکنش‌گرا و کاربرپسند تبدیل می‌کنم.",
    creative: "خلاق",
    roles: [
      "توسعه‌دهنده فرانت‌اند",
      "متخصص بازاریابی دیجیتال",
      "توسعه‌دهنده خلاق",
    ],
    aboutMe: "درباره من",
  },
};

export default function Hero() {
  const { i18n } = useTranslation();

  const rawLanguage = i18n.resolvedLanguage || i18n.language || "en";

  const languageCode = rawLanguage.toLowerCase().split("-")[0];

  const language = ["fs", "fa", "ps", "dr"].includes(languageCode)
    ? "fs"
    : "en";

  const content = translations[language];
  const isRTL = language === "fs";

  const heroRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Follow page scrolling and fade the indicator near About.
  useEffect(() => {
    let animationFrame;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const hero = heroRef.current;
        const about = document.getElementById("about");

        if (!hero || !about) return;

        const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;

        const aboutTop = about.getBoundingClientRect().top + window.scrollY;

        const start = Math.max(0, heroBottom - window.innerHeight * 0.65);

        const end = Math.max(start + 1, aboutTop - window.innerHeight * 0.65);

        const progress = Math.min(
          1,
          Math.max(0, (window.scrollY - start) / (end - start))
        );

        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Smooth typing animation for professional roles.
  useEffect(() => {
    const currentRole = content.roles[roleIndex];

    const delay =
      !isDeleting && displayText === currentRole ? 2200 : isDeleting ? 45 : 90;

    if (isDeleting && displayText === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((previous) => (previous + 1) % content.roles.length);
      }, 350);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setDisplayText((previous) => previous.slice(0, -1));
      } else {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, content.roles]);

  // Reset typing when the language changes.
  useEffect(() => {
    setDisplayText("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [language]);

  const arrowOpacity =
    scrollProgress >= 0.98
      ? 0
      : scrollProgress === 0
      ? 0.9
      : 0.9 - scrollProgress * 0.7;

  return (
    <section
      id="home"
      ref={heroRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="hero-section relative flex min-h-[calc(100vh-88px)]
        items-center overflow-x-clip bg-background py-16 md:py-20"
    >
      {/* Ambient purple background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2
          h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2
          rounded-full bg-primary/15 blur-[120px]
          md:h-[500px] md:w-[500px]"
      />

      <div
        aria-hidden="true"
        className="hero-orb pointer-events-none absolute -right-24
          top-16 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]"
      />

      <div
        className="container relative z-10 mx-auto w-full
          max-w-[1200px] px-6"
      >
        <div
          className="grid items-center gap-12
            md:grid-cols-[1fr_0.9fr_1fr] md:gap-6"
        >
          {/* Left: Introduction */}
          <div
            className="hero-intro order-2 min-w-0 text-center
              md:order-1 md:text-start"
          >
            <span
              className="mb-4 inline-block text-xs font-semibold
                uppercase tracking-[0.2em] text-accent-light sm:text-sm"
            >
              {content.welcome}
            </span>

            <h1
              className="text-3xl font-extrabold leading-tight
                text-foreground sm:text-4xl lg:text-5xl"
            >
              <span className="block">{content.greeting}</span>

              <span
                dir="auto"
                className="hero-name mt-2 block whitespace-nowrap
                  text-2xl text-accent-light sm:text-4xl lg:text-5xl"
              >
                {content.name}
              </span>
            </h1>

            <a
              href="#projects"
              className="hero-button group relative mt-8 inline-flex
                items-center gap-4 overflow-hidden rounded-full
                border border-white/15 bg-black/40 px-7 py-3.5
                text-sm font-semibold text-white
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                backdrop-blur-xl transition-all duration-500
                hover:-translate-y-1 hover:border-purple-400/60
                hover:bg-white/10
                hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)]
                active:scale-95"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0
                  bg-gradient-to-r from-white/[0.08]
                  via-transparent to-white/[0.03]
                  opacity-70 transition-opacity duration-500
                  group-hover:opacity-100"
              />

              <span className="relative">{content.explore}</span>

              <span
                className="relative flex h-8 w-8 items-center
                  justify-center rounded-full border border-white/20
                  bg-white/5 transition-all duration-300
                  group-hover:rotate-45 group-hover:bg-white
                  group-hover:text-black"
              >
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>

          {/* Center: Portrait */}
          <div className="hero-portrait-wrap order-1 flex justify-center md:order-2">
            <div className="hero-portrait relative">
              <div
                aria-hidden="true"
                className="hero-portrait-frame pointer-events-none
                  absolute -inset-3 rounded-[48%_48%_40%_40%]
                  border border-accent/40"
              />

              <div
                aria-hidden="true"
                className="hero-portrait-glow pointer-events-none
                  absolute -inset-8 rounded-full bg-purple-600/10 blur-2xl"
              />
              

              <div
                className="relative z-10 h-[300px] w-[240px]
                  overflow-hidden rounded-[48%_48%_40%_40%]
                  border border-accent/30 bg-surface
                  shadow-[0_0_45px_rgba(139,92,246,0.12)]
                  sm:h-[360px] sm:w-[280px]"
              >
                <img
                  src={maryam_img}
                  alt={content.name}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <span
                aria-hidden="true"
                className="hero-dot absolute -right-3 top-16 z-20
                  h-4 w-4 rounded-full bg-accent-light
                  shadow-[0_0_18px_rgba(167,139,250,0.7)]"
              />

              <span
                aria-hidden="true"
                className="hero-dot-secondary absolute -bottom-1
                  left-5 z-20 h-3 w-3 rounded-full bg-white"
              />

              <span
                aria-hidden="true"
                className="hero-orbit absolute -right-8 top-1/2
                  h-3 w-3 rounded-full border border-purple-300/70"
              />
            </div>
          </div>
          

          {/* Right: Animated professional roles */}
          <div className="hero-roles order-3 min-w-0 text-center md:text-start">
            <span
              className="text-xs font-semibold uppercase
                tracking-[0.2em] text-muted sm:text-sm"
            >
              {content.whatIDo}
            </span>

            <h2
              aria-live="polite"
              dir="auto"
              className="mt-4 min-h-[100px] break-words
                text-3xl font-extrabold leading-tight
                text-accent-light sm:text-4xl lg:text-5xl"
            >
              {displayText}
              <span
                aria-hidden="true"
                className="hero-cursor ml-1 inline-block h-[0.9em]
                  w-[2px] translate-y-1 bg-accent-light"
              />
            </h2>

            <p
              className="mt-5 max-w-sm text-base leading-8
                text-muted md:text-lg"
            >
              {content.description}
            </p>

            <span
              className="mt-4 inline-flex items-center gap-2
                rounded-full border border-accent/30
                bg-accent/10 px-4 py-2 text-sm
                font-medium text-accent-light"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-accent-light"
              />
              {content.creative}
            </span>

            <div
              className="mt-7 flex justify-center gap-2 md:justify-start"
              aria-hidden="true"
            >
              {content.roles.map((role, index) => (
                <span
                  key={role}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    roleIndex === index ? "w-8 bg-accent" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      {/* <a
        href="#about"
        aria-label={content.aboutMe}
        className="hero-scroll-indicator group fixed bottom-6 left-1/2
          z-40 flex -translate-x-1/2 flex-col items-center
          transition-opacity duration-300"
        style={{
          opacity: arrowOpacity,
          transform: `translate(-50%, ${scrollProgress * 18}px)`,
          pointerEvents: scrollProgress >= 0.98 ? "none" : "auto",
        }}
      >
        <span
          className="mb-2 whitespace-nowrap text-[10px] font-semibold
            uppercase tracking-[0.25em] text-accent-light/80
            transition-colors duration-300 group-hover:text-white"
        >
          {content.aboutMe}
        </span>

        <span
          aria-hidden="true"
          className="relative flex h-11 w-7 items-start
            justify-center overflow-hidden rounded-full
            border border-accent-light/40 bg-black/40 p-1
            backdrop-blur-md transition-all duration-300
            group-hover:border-accent-light
            group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <span className="hero-scroll-dot h-2.5 w-1 rounded-full bg-accent-light" />
        </span>

        <ChevronDown
          aria-hidden="true"
          size={16}
          className="mt-1 text-accent-light/70
            transition-transform duration-300
            group-hover:translate-y-1 group-hover:text-white"
        />
      </a> */}
    </section>
  );
}
