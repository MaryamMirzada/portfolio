import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const content = {
  en: {
    label: "GET TO KNOW ME",
    title: "About Me",
    intro: "Building digital experiences with creativity.",
    description:
      "I'm a Junior Front-End Developer and Digital Marketer passionate about creating modern, responsive, and user-friendly websites. I also help businesses strengthen their brand identity and build a professional online presence.",
    servicesTitle: "What I Do",
    services: [
      "Front-End Development",
      "Modern & Responsive Websites",
      "Digital Marketing",
      "Branding & Onlinecd",
      "UI/UX Design",
    ],
    button: "Let's Work Together",
  },
  fs: {
    label: "بیشتر با من آشنا شوید",
    title: "درباره من",
    intro: "خلق تجربه‌های دیجیتالی با خلاقیت",
    description:
      "من یک توسعه‌دهنده جونیور فرانت‌اند و متخصص بازاریابی دیجیتال هستم. به ساخت وب‌سایت‌های مدرن، واکنش‌گرا و کاربرپسند علاقه دارم. همچنان به کسب‌وکارها کمک می‌کنم تا هویت برند خود را تقویت کرده و حضور حرفه‌ای‌تری در فضای آنلاین داشته باشند.",
    servicesTitle: "در چه بخش‌هایی فعالیت می‌کنم؟",
    services: [
      "توسعه فرانت‌اند",
      "ساخت وب‌سایت‌های مدرن و واکنش‌گرا",
      "بازاریابی دیجیتال",
      "برندسازی و حضور آنلاین",
      "طراحی رابط و تجربه کاربری",
    ],
    button: "بیایید همکاری کنیم",
  },
};

export default function About() {
  const { i18n } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const rawLanguage = i18n.resolvedLanguage || i18n.language || "en";

  const languageCode = rawLanguage.toLowerCase().split("-")[0];
  const language = ["fs", "fa", "ps", "dr"].includes(languageCode)
    ? "fs"
    : "en";

  const t = content[language];
  const isRTL = language === "fs";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-background
        px-6 py-24 md:py-32"
    >
      {/* Purple background glow */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4
          h-80 w-80 rounded-full bg-primary/15 blur-[130px]"
      />

      <div
        className="pointer-events-none absolute -left-32 bottom-0
        h-72 w-72 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        {/* Section heading */}
        <div
          className={`about-reveal transition-all duration-1000
            ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
        >
          <span
            className="text-sm font-semibold uppercase
            tracking-[0.2em] text-accent-light"
          >
            {t.label}
          </span>

          <h2
            className="mt-4 text-4xl font-extrabold
            text-foreground sm:text-6xl"
          >
            {t.title}
            <span className="text-accent-light">.</span>
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-accent" />
        </div>

        {/* Introduction */}
        <div
          className={`about-reveal mt-10 max-w-4xl
            transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          style={{ transitionDelay: "180ms" }}
        >
          <h3
            className="text-2xl font-bold leading-relaxed
            text-foreground sm:text-3xl"
          >
            {t.intro}
          </h3>

          <p
            className="mt-6 max-w-3xl text-base leading-8
            text-muted sm:text-lg"
          >
            {t.description}
          </p>
        </div>

        {/* Services */}
        <div className="mt-12">
          <h4
            className={`about-reveal text-lg font-bold
              text-foreground transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "300ms" }}
          >
            {t.servicesTitle}
          </h4>

          <div className="mt-6 flex flex-wrap gap-3">
            {t.services.map((service, index) => (
              <span
                key={service}
                className={`about-reveal rounded-xl border
                  border-white/10 bg-white/[0.03] px-4 py-3
                  text-sm text-foreground backdrop-blur-sm
                  transition-all duration-700 hover:-translate-y-1
                  hover:border-accent/60 hover:bg-primary/15 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                style={{
                  transitionDelay: `${400 + index * 120}ms`,
                }}
              >
                <span className="me-2 text-accent-light">✦</span>
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Contact button */}
        <div
          className={`about-reveal mt-10 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "950ms" }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3
              rounded-full border border-accent/50
              bg-primary/15 px-6 py-3.5 font-semibold
              text-foreground transition-all duration-300
              hover:-translate-y-1 hover:border-accent
              hover:bg-primary/30"
          >
            {t.button}
            <span
              className="transition-transform duration-300
              group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
