import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  BriefcaseBusiness,
  GraduationCap,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workExperience = [
  {
    id: 1,
    titleKey: "expArshTitle",
    organizationKey: "expArshOrganization",
    dateKey: "expArshDate",
    descriptionKey: "expArshDescription",
  },
  {
    id: 2,
    titleKey: "expCtiTitle",
    organizationKey: "expCtiOrganization",
    dateKey: "expCtiDate",
    descriptionKey: "expCtiDescription",
  },
  {
    id: 3,
    titleKey: "expAdaTitle",
    organizationKey: "expAdaOrganization",
    dateKey: "expAdaDate",
    descriptionKey: "expAdaDescription",
  },
];

const education = [
  {
    id: 1,
    titleKey: "eduFrontendTitle",
    organizationKey: "eduFrontendOrganization",
    descriptionKey: "eduFrontendDescription",
  },
  {
    id: 2,
    titleKey: "eduMarketingTitle",
    organizationKey: "eduMarketingOrganization",
    descriptionKey: "eduMarketingDescription",
    link: "https://www.linkedin.com/company/hbc-company/",
  },
  {
    id: 3,
    titleKey: "eduLeadershipTitle",
    organizationKey: "eduLeadershipOrganization",
    descriptionKey: "eduLeadershipDescription",
  },
];

function TimelineItem({ item, t, isEducation = false }) {
  return (
    <article
      data-direction={isEducation ? "right" : "left"}
      className="experience-timeline-card group relative border-l border-purple-500/30 pb-9 pl-6 last:pb-0"
    >
      {/* Timeline Dot */}
      <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-125" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0f] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)] sm:p-6">
        {/* Subtle purple glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-purple-600/0 blur-3xl transition-colors duration-500 group-hover:bg-purple-600/15" />

        <div className="relative">
          <h3 className="text-lg font-bold leading-7 text-white transition-colors duration-300 group-hover:text-purple-400">
            {t(item.titleKey)}
          </h3>

          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
            >
              {t(item.organizationKey)}
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <p className="mt-2 text-sm font-medium text-purple-400">
              {t(item.organizationKey)}
            </p>
          )}

          {!isEducation && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays size={14} />
              <span>{t(item.dateKey)}</span>
            </div>
          )}

          <p className="mt-4 text-sm leading-7 text-gray-400">
            {t(item.descriptionKey)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ExperienceEducation() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

  const isPersian = ["fs", "fa", "ps", "dr"].includes(
    i18n.language?.split("-")[0]
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Section heading animation
      gsap.fromTo(
        ".experience-section-heading",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-section-heading",
            start: "top 85%",
            toggleActions: "play none play reverse",
          },
        }
      );

      // Column heading animation
      gsap.fromTo(
        ".experience-column-heading",
        {
          autoAlpha: 0,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-columns",
            start: "top 85%",
            toggleActions: "play none play reverse",
          },
        }
      );

      // Cards enter from opposite directions
      const cards = gsap.utils.toArray(".experience-timeline-card", section);

      cards.forEach((card) => {
        const direction = card.dataset.direction === "left" ? -1 : 1;

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            x: direction * 70,
            y: 24,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none play reverse",
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      dir={isPersian ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-700/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="experience-section-heading mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            {t("experienceEducationSubtitle")}
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("experienceEducationHeading")}{" "}
            <span className="text-purple-500">
              {t("experienceEducationHighlight")}
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-purple-600" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
            {t("experienceEducationDescription")}
          </p>
        </div>

        {/* Two Columns */}
        <div className="experience-columns grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Work Experience — Left */}
          <div>
            <div className="experience-column-heading mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <BriefcaseBusiness size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  {t("workExperienceHeading")}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t("workExperienceSubtitle")}
                </p>
              </div>
            </div>

            <div className="ml-1">
              {workExperience.map((item) => (
                <TimelineItem key={item.id} item={item} t={t} />
              ))}
            </div>
          </div>

          {/* Education — Right */}
          <div>
            <div className="experience-column-heading mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <GraduationCap size={26} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">{t("educationHeading")}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t("educationSubtitle")}
                </p>
              </div>
            </div>

            <div className="ml-1">
              {education.map((item) => (
                <TimelineItem key={item.id} item={item} t={t} isEducation />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
