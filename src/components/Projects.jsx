
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import portfolio from "../assets/portfolio.png";
import booknest from "../assets/booknest.png";
import evora from "../assets/evora.png";
import project_four from "../assets/project_four.png";

// Custom GitHub SVG Icon
function GithubIcon({ size = 21, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.13 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
      />
    </svg>
  );
}

const projects = [
  {
    id: 1,
    titleKey: "portfolioTitle",
    descriptionKey: "portfolioDescription",
    image: portfolio,
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY",
    live: "https://your-portfolio.vercel.app",
  },
  {
    id: 2,
    titleKey: "booknestTitle",
    descriptionKey: "booknestDescription",
    image: booknest,
    technologies: ["React", "JavaScript", "CSS"],
    github: "https://github.com/YOUR_USERNAME/BookNest",
    live: "https://your-booknest.vercel.app",
  },
  {
    id: 3,
    titleKey: "evoraTitle",
    descriptionKey: "evoraDescription",
    image: evora,
    technologies: ["React", "Tailwind CSS", "UI/UX"],
    github: "https://github.com/YOUR_USERNAME/evora",
    live: "https://your-evora.vercel.app",
  },
  {
    id: 4,
    titleKey: "projectFourTitle",
    descriptionKey: "projectFourDescription",
    image: project_four,
    technologies: ["React", "JavaScript", "CSS"],
    github: "https://github.com/YOUR_USERNAME/project-four",
    live: "https://your-project-four.vercel.app",
  },
];

export default function Projects() {
  const { t, i18n } = useTranslation();

  const carouselRef = useRef(null);

  const isPersian = ["fs", "fa", "ps", "dr"].includes(
    i18n.language?.split("-")[0]
  );

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      dir={isPersian ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-700/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            {t("projectsSubtitle")}
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("projectsHeading")}{" "}
            <span className="text-purple-500">
              {t("projectsHighlight")}
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-purple-600" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
            {t("projectsDescription")}
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {t("projectsCount", { count: projects.length })}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label={t("previousProjects")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 transition-all duration-300 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
            >
              {isPersian ? (
                <ChevronRight size={21} />
              ) : (
                <ChevronLeft size={21} />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label={t("nextProjects")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 transition-all duration-300 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
            >
              {isPersian ? (
                <ChevronLeft size={21} />
              ) : (
                <ChevronRight size={21} />
              )}
            </button>
          </div>
        </div>

        {/* Horizontal Projects Carousel */}
        <div
          ref={carouselRef}
          dir="ltr"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              dir={isPersian ? "rtl" : "ltr"}
              className="group w-[85%] min-w-[85%] snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)]"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111116]">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t(project.titleKey)} - ${t("liveDemo")}`}
                  className="block h-full w-full"
                >
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </a>

                {/* Image Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Project Number */}
                <span className="absolute bottom-4 left-4 text-sm font-semibold tracking-widest text-purple-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* GitHub Icon */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t(project.titleKey)} - GitHub`}
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:bg-purple-600"
                >
                  <GithubIcon size={21} />
                </a>
              </div>

              {/* Project Details */}
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-purple-400">
                    {t(project.titleKey)}
                  </h3>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("liveDemo")}: ${t(project.titleKey)}`}
                    className="shrink-0 rounded-lg border border-white/10 p-2 text-gray-400 transition-all duration-300 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <p className="mb-5 min-h-[80px] text-sm leading-7 text-gray-400">
                  {t(project.descriptionKey)}
                </p>

                {/* Technologies */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 hover:text-purple-400"
                  >
                    <GithubIcon size={17} />
                    <span>{t("sourceCode")}</span>
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300"
                  >
                    <span>{t("liveDemo")}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Hint */}
        <p className="mt-2 text-center text-xs text-gray-500">
          {t("carouselHint")}
        </p>
      </div>
    </section>
  );
}
