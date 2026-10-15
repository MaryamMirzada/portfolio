import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aspire from "../assets/certificate/aspire.png";
import web from "../assets/certificate/web.png";
import Ai from "../assets/certificate/Ai.png";

import {
  Award,
  ExternalLink,
  X,
  GraduationCap,
  Code2,
  BrainCircuit,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    id: 1,
    titleKey: "certAspireTitle",
    organizationKey: "certAspireOrganization",
    year: "2026",
    category: "leadership",
    image: aspire,
    icon: GraduationCap,
  },
  {
    id: 2,
    titleKey: "certCtiTitle",
    organizationKey: "certCtiOrganization",
    year: "2026",
    category: "development",
    image: web,
    icon: Code2,
  },
  {
    id: 3,
    titleKey: "certAITitle",
    organizationKey: "certAIOrganization",
    year: "2026",
    category: "technology",
    image: Ai,
    icon: BrainCircuit,
  },
];

export default function Certificates() {
  const { t, i18n } = useTranslation();

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");

  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  const isPersian = ["fs", "fa", "ps", "dr"].includes(
    i18n.language?.split("-")[0]
  );

  const filters = [
    { key: "all", label: t("certFilterAll") },
    { key: "development", label: t("certFilterDevelopment") },
    { key: "leadership", label: t("certFilterLeadership") },
    { key: "technology", label: t("certFilterTechnology") },
  ];

  const filteredCertificates =
    activeFilter === "all"
      ? certificates
      : certificates.filter(
          (certificate) => certificate.category === activeFilter
        );

  // -----------------------------------------
  // 1. Section heading and filter animations
  // -----------------------------------------
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Main heading
      gsap.fromTo(
        ".cert-heading-content",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cert-heading",
            start: "top 85%",
            toggleActions: "play none play reverse",
          },
        }
      );

      // Certificate count
      gsap.fromTo(
        ".cert-count",
        {
          autoAlpha: 0,
          scale: 0.85,
          y: 20,
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".cert-heading",
            start: "top 85%",
            toggleActions: "play none play reverse",
          },
        }
      );

      // Category filters
      gsap.fromTo(
        ".cert-filter",
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cert-filters",
            start: "top 90%",
            toggleActions: "play none play reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // -----------------------------------------
  // 2. Card animations on scroll
  // Re-run when the category filter changes
  // -----------------------------------------
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".cert-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 45,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none play reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [activeFilter]);

  // -----------------------------------------
  // 3. Certificate modal opening animation
  // -----------------------------------------
  useEffect(() => {
    if (!selectedCertificate) return;

    const overlay = modalRef.current;
    const content = modalContentRef.current;

    if (!overlay || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.25,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        content,
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    });

    return () => ctx.revert();
  }, [selectedCertificate]);

  // -----------------------------------------
  // Certificate image preview
  // -----------------------------------------
  const renderCertificatePreview = (certificate) => {
    const Icon = certificate.icon;
    const imageFailed = failedImages[certificate.id];

    return (
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-purple-400/20 bg-[#100B18] sm:h-56">
        {!imageFailed ? (
          <img
            src={certificate.image}
            alt={t(certificate.titleKey)}
            onError={() =>
              setFailedImages((previous) => ({
                ...previous,
                [certificate.id]: true,
              }))
            }
            className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/70 via-[#100B18] to-black p-6 text-center">
            <div className="absolute inset-3 rounded-lg border border-dashed border-purple-400/30" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10">
              <Icon size={32} className="text-purple-300" />
            </div>

            <div className="relative space-y-2">
              <p className="text-xs tracking-[0.2em] text-purple-300">
                {t("certPreviewLabel")}
              </p>

              <h3 className="max-w-xs text-lg font-semibold text-white">
                {t(certificate.titleKey)}
              </h3>

              <p className="text-sm text-gray-400">
                {t(certificate.organizationKey)}
              </p>
            </div>

            <Award
              size={22}
              className="absolute bottom-5 right-5 text-purple-400/50"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      dir={isPersian ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-700/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="cert-heading mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="cert-heading-content mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />

              <p className="text-xs font-semibold tracking-[0.28em] text-purple-300 sm:text-sm">
                {t("certificatesSubtitle")}
              </p>
            </div>

            <h2 className="cert-heading-content text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("certificatesHeading")}{" "}
              <span className="text-purple-400">
                {t("certificatesHighlight")}
              </span>
            </h2>

            <p className="cert-heading-content mt-5 max-w-xl leading-7 text-gray-400">
              {t("certificatesDescription")}
            </p>
          </div>

          {/* Certificate count */}
          <div className="cert-count flex w-fit items-center gap-3 rounded-2xl border border-purple-400/20 bg-[#100B18] px-5 py-4">
            <Award size={27} className="text-purple-300" />

            <div>
              <p className="text-2xl font-bold text-white">
                {certificates.length.toString().padStart(2, "0")}
              </p>

              <p className="text-xs text-gray-400">
                {t("certificatesCountLabel")}
              </p>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="cert-filters mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={`cert-filter rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                activeFilter === filter.key
                  ? "border-purple-400 bg-purple-500/15 text-purple-200 shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                  : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-purple-400/50 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((certificate, index) => (
            <button
              key={certificate.id}
              type="button"
              onClick={() => setSelectedCertificate(certificate)}
              aria-label={`${t("viewCertificate")}: ${t(certificate.titleKey)}`}
              className="cert-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0A0F] p-3 text-start transition-[border-color,box-shadow] duration-300 hover:border-purple-400/50 hover:shadow-[0_12px_40px_rgba(91,32,201,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <div className="mb-4">
                {renderCertificatePreview(certificate)}
              </div>

              <div className="flex items-start justify-between gap-3 px-2 pb-3">
                <div className="min-w-0">
                  <p className="mb-2 text-xs text-purple-300">
                    {certificate.year} / {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-base font-semibold leading-6 text-white transition-colors group-hover:text-purple-200">
                    {t(certificate.titleKey)}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {t(certificate.organizationKey)}
                  </p>
                </div>

                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all group-hover:border-purple-400/40 group-hover:bg-purple-500/10 group-hover:text-purple-200">
                  <ExternalLink size={15} />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredCertificates.length === 0 && (
          <p className="py-12 text-center text-gray-400">
            {t("certificatesEmpty")}
          </p>
        )}
      </div>

      {/* Certificate preview modal */}
      {selectedCertificate && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 opacity-0 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
          role="presentation"
        >
          <div
            ref={modalContentRef}
            role="dialog"
            aria-modal="true"
            aria-label={t(selectedCertificate.titleKey)}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-purple-400/30 bg-[#0C0911] p-4 opacity-0 shadow-[0_0_70px_rgba(91,32,201,0.15)] sm:p-6"
          >
            {/* Modal header */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {t(selectedCertificate.titleKey)}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {t(selectedCertificate.organizationKey)} ·{" "}
                  {selectedCertificate.year}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label={t("closeCertificate")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Full certificate image */}
            <div className="flex min-h-[250px] items-center justify-center overflow-hidden rounded-xl bg-black sm:min-h-[400px]">
              {!failedImages[selectedCertificate.id] ? (
                <img
                  src={selectedCertificate.image}
                  alt={t(selectedCertificate.titleKey)}
                  onError={() =>
                    setFailedImages((previous) => ({
                      ...previous,
                      [selectedCertificate.id]: true,
                    }))
                  }
                  className="max-h-[70vh] w-full object-contain"
                />
              ) : (
                renderCertificatePreview(selectedCertificate)
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
