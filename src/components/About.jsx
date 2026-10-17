import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const content = {
  en: {
    label: "GET TO KNOW ME",
    title: "About Me",
    intro: "Turning ideas into meaningful digital experiences.",
    description:
      "I'm a Junior Front-End Developer and Digital Marketer passionate about building modern, responsive, and user-friendly websites. I enjoy transforming ideas into engaging digital experiences by combining clean code, creative design, and a strong focus on usability. My goal is to create websites that look professional and provide a smooth experience across different devices.",
    secondDescription:
      "Alongside web development, I work in digital marketing, content creation, and brand development. I help businesses strengthen their online presence, communicate their value, and connect with their target audiences through thoughtful digital strategies. I continuously explore new technologies and improve my skills to create practical digital solutions for people, businesses, and communities.",
    servicesTitle: "What I Do",
    services: [
      "Front-End Development",
      "Responsive Web Design",
      "React & Modern Web Technologies",
      "UI/UX Design",
      "Digital Marketing",
      "Social Media Management",
      "Content Creation",
      "Branding & Online Presence",
    ],
    approachTitle: "My Approach",
    approachDescription:
      "I believe good digital products should combine functionality, simplicity, accessibility, and visual appeal. I focus on understanding users' needs, paying attention to details, and continuously learning to deliver better results.",
    button: "Let's Work Together",
  },

  fs: {
    label: "بیشتر با من آشنا شوید",
    title: "درباره من",
    intro: "تبدیل ایده‌ها به تجربه‌های دیجیتالی ارزشمند.",
    description:
      "من یک توسعه‌دهنده جونیور فرانت‌اند و فعال در بخش بازاریابی دیجیتال هستم. به ساخت وب‌سایت‌های مدرن، واکنش‌گرا و کاربرپسند علاقه دارم. تلاش می‌کنم با ترکیب کدنویسی منظم، طراحی خلاقانه و توجه به نیازهای کاربران، وب‌سایت‌هایی بسازم که ظاهر حرفه‌ای داشته باشند و در دستگاه‌های مختلف به‌خوبی کار کنند.",
    secondDescription:
      "در کنار توسعه وب، در بخش بازاریابی دیجیتال، تولید محتوا و توسعه هویت برند نیز فعالیت می‌کنم. به کسب‌وکارها کمک می‌کنم تا حضور آنلاین خود را تقویت کنند، خدمات و ارزش‌های‌شان را بهتر معرفی نمایند و از طریق راهکارهای مناسب دیجیتالی با مخاطبان هدف خود ارتباط برقرار کنند. همچنان به یادگیری فناوری‌های جدید و بهبود مهارت‌هایم ادامه می‌دهم تا راهکارهای کاربردی برای افراد، کسب‌وکارها و جوامع ایجاد کنم.",
    servicesTitle: "در چه بخش‌هایی فعالیت می‌کنم؟",
    services: [
      "توسعه فرانت‌اند",
      "طراحی وب‌سایت‌های واکنش‌گرا",
      "ری‌اکت و فناوری‌های مدرن وب",
      "طراحی رابط و تجربه کاربری",
      "بازاریابی دیجیتال",
      "مدیریت شبکه‌های اجتماعی",
      "تولید محتوا",
      "برندسازی و حضور آنلاین",
    ],
    approachTitle: "روش کار من",
    approachDescription:
      "باور دارم که محصولات دیجیتالی خوب باید کاربردی، ساده، قابل‌دسترس و از نظر بصری جذاب باشند. تلاش می‌کنم نیازهای کاربران را درک کنم، به جزئیات توجه داشته باشم و با یادگیری مداوم، کیفیت کار و نتیجه نهایی را بهبود ببخشم.",
    button: "بیایید همکاری کنیم",
  },
};

const revealClass = (isVisible, delay = 0) =>
  `transition-all duration-1000 ease-out ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;

export default function About() {
  const { i18n } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const rawLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const languageCode = rawLanguage.toLowerCase().split("-")[0];

  const language = ["fs", "fa", "ps", "dr", "prs"].includes(languageCode)
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

  const reveal = (delay = 0) => ({
    className: revealClass(isVisible, delay),
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-background px-6 py-24 md:py-32"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4
          h-80 w-80 rounded-full bg-primary/15 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0
          h-72 w-72 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        {/* Section Heading */}
        <div {...reveal(0)}>
          <span
            className="text-sm font-semibold uppercase
              tracking-[0.2em] text-accent-light"
          >
            {t.label}
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-foreground sm:text-6xl">
            {t.title}
            <span className="text-accent-light">.</span>
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-accent" />
        </div>

        {/* Introduction */}
        <div
          className={`mt-10 max-w-4xl ${revealClass(isVisible)}`}
          style={{ transitionDelay: "150ms" }}
        >
          <h3 className="text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
            {t.intro}
          </h3>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {t.description}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {t.secondDescription}
          </p>
        </div>

        {/* Services */}
        <div className="mt-14">
          <h4
            {...reveal(250)}
            className={`text-lg font-bold text-foreground ${revealClass(
              isVisible
            )}`}
          >
            {t.servicesTitle}
          </h4>

          <div className="mt-6 flex flex-wrap gap-3">
            {t.services.map((service, index) => (
              <span
                key={service}
                {...reveal(300 + index * 80)}
                className={`rounded-xl border border-white/10
                  bg-white/[0.03] px-4 py-3 text-sm text-foreground
                  backdrop-blur-sm transition-all duration-300
                  hover:-translate-y-1 hover:border-accent/60
                  hover:bg-primary/15 ${revealClass(isVisible)}`}
              >
                <span className="me-2 text-accent-light">✦</span>
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* My Approach */}
        <div
          {...reveal(450)}
          className={`mt-14 rounded-2xl border border-white/10
            bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8
            ${revealClass(isVisible)}`}
        >
          <h4 className="text-xl font-bold text-foreground">
            {t.approachTitle}
          </h4>

          <p className="mt-4 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {t.approachDescription}
          </p>
        </div>

        {/* Contact Button */}
        <div {...reveal(550)} className={`mt-10 ${revealClass(isVisible)}`}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3
              rounded-full border border-accent/50 bg-primary/15
              px-6 py-3.5 font-semibold text-foreground
              transition-all duration-300 hover:-translate-y-1
              hover:border-accent hover:bg-primary/30"
          >
            {t.button}

            <span
              aria-hidden="true"
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
