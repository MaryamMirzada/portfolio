
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
    roles: [
      "Front-End Developer",
      "Digital Marketer",
      "Creative Developer",
    ],
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

  const rawLanguage =
    i18n.resolvedLanguage || i18n.language || "en";

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
  const [showAboutArrow, setShowAboutArrow] = useState(false);

  // Show the About arrow while scrolling through the Hero section.
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;

      if (!hero) return;

      const heroBottom = hero.getBoundingClientRect().bottom;

      setShowAboutArrow(
        window.scrollY > 80 && heroBottom > 100
      );
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typing and deleting animation for job titles.
  useEffect(() => {
    const currentRole = content.roles[roleIndex];

    const delay =
      !isDeleting && displayText === currentRole
        ? 2200
        : isDeleting
          ? 65
          : 110;

    if (isDeleting && displayText === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex(
          (previous) => (previous + 1) % content.roles.length
        );
      }, 300);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setDisplayText((previous) => previous.slice(0, -1));
      } else {
        setDisplayText(
          currentRole.slice(0, displayText.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, content.roles]);

  // Reset the typing animation when the language changes.
  useEffect(() => {
    setDisplayText("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [language]);

  return (
    <section
      id="home"
      ref={heroRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative flex min-h-[calc(100vh-88px)]
        items-center overflow-x-clip bg-background
        py-16 md:py-20"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2
          h-[350px] w-[350px] -translate-x-1/2
          -translate-y-1/2 rounded-full bg-primary/15
          blur-[120px] md:h-[500px] md:w-[500px]"
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
            className="order-2 min-w-0 text-center
              md:order-1 md:text-start"
          >
            <span
              className="mb-4 inline-block text-sm font-semibold
                uppercase tracking-[0.2em] text-accent-light"
            >
              {content.welcome}
            </span>

            <h1
              className="text-3xl font-extrabold leading-tight
                text-foreground sm:text-4xl lg:text-5xl"
            >
              <span className="block">
                {content.greeting}
              </span>

              <span
                dir="auto"
                className="mt-2 block whitespace-nowrap
                  text-2xl text-accent-light
                  sm:text-4xl lg:text-5xl"
              >
                {content.name}
              </span>
            </h1>

            {/* Explore button */}
            <a
              href="#projects"
              className="group relative mt-8 inline-flex
                items-center gap-4 overflow-hidden
                rounded-full border border-white/15
                bg-black/40 px-7 py-3.5 text-sm
                font-semibold text-white
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                backdrop-blur-xl transition-all duration-500
                hover:-translate-y-1 hover:border-white/40
                hover:bg-white/10
                hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)]
                active:scale-95"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0
                  rounded-full bg-gradient-to-r
                  from-white/[0.08] via-transparent
                  to-white/[0.03] opacity-70
                  transition-opacity duration-500
                  group-hover:opacity-100"
              />

              <span className="relative">
                {content.explore}
              </span>

              <span
                aria-hidden="true"
                className="relative flex h-8 w-8
                  items-center justify-center rounded-full
                  border border-white/20 bg-white/5
                  transition-all duration-500
                  group-hover:translate-x-1
                  group-hover:bg-white
                  group-hover:text-black"
              >
                ↗
              </span>
            </a>
          </div>

          {/* Center: Portrait */}
          <div
            className="order-1 flex justify-center
              md:order-2"
          >
            <div className="hero-portrait relative">
              {/* Purple frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3
                  rounded-[48%_48%_40%_40%]
                  border border-accent/40"
              />

              {/* Portrait image */}
              <div
                className="relative z-10 h-[300px] w-[240px]
                  overflow-hidden
                  rounded-[48%_48%_40%_40%]
                  border border-accent/30 bg-surface
                  shadow-[0_0_45px_rgba(139,92,246,0.12)]
                  sm:h-[360px] sm:w-[280px]"
              >
                <img
                  src={maryam_img}
                  alt={content.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Decorative dots */}
              <span
                aria-hidden="true"
                className="absolute -right-3 top-16 z-20
                  h-4 w-4 rounded-full bg-accent-light
                  shadow-[0_0_18px_rgba(167,139,250,0.7)]"
              />

              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-5 z-20
                  h-3 w-3 rounded-full bg-white"
              />
            </div>
          </div>

          {/* Right: Animated professional roles */}
          <div
            className="order-3 min-w-0 text-center
              md:text-start"
          >
            <span
              className="text-sm font-semibold uppercase
                tracking-[0.2em] text-muted"
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
                className="ml-1 inline-block h-[0.9em]
                  w-[2px] translate-y-1
                  animate-pulse bg-accent-light"
              />
            </h2>

            <p
              className="mt-5 max-w-sm text-base leading-8
                text-muted md:text-lg"
            >
              {content.description}
            </p>

            {/* Creative label */}
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

            {/* Role progress indicators */}
            <div
              className="mt-7 flex justify-center gap-2
                md:justify-start"
              aria-hidden="true"
            >
              {content.roles.map((role, index) => (
                <span
                  key={role}
                  className={`h-1.5 rounded-full
                    transition-all duration-500 ${
                      roleIndex === index
                        ? "w-8 bg-accent"
                        : "w-2 bg-border"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-triggered arrow linking to About */}
      <a
        href="#about"
        aria-label={content.aboutMe}
        className={`absolute bottom-[-24px] left-1/2 z-30
          flex -translate-x-1/2 flex-col items-center
          transition-all duration-700 ${
            showAboutArrow
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-5 opacity-0"
          }`}
      >
        <span
          className="mb-1 whitespace-nowrap text-xs
            font-bold uppercase tracking-[0.2em]
            text-accent-light"
        >
          {content.aboutMe}
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 44 64"
          fill="none"
          className="h-16 w-11 overflow-visible
            drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        >
          {/* Thick vertical line */}
          <path
            d="M22 2 V48"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="text-accent-light"
          />

          {/* Large downward arrowhead */}
          <path
            d="M8 35 L22 52 L36 35"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-light"
          />
        </svg>
      </a>
    </section>
  );
}
