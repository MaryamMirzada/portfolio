import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

import {
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

function GithubIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.94.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.57-.29-5.28-1.29-5.28-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.17 1.19a11 11 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.72 5.43-5.3 5.72.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const contactInfo = {
  email: "marimmirzada@gmail.com",
  phone: "+93 788255356",
  github: "https://github.com/MaryamMirzada",
  linkedin: "https://www.linkedin.com/in/maryam-mirzada-86b945351/",
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const formRef = useRef(null);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const isPersian = ["fs", "fa", "ps", "dr"].includes(
    i18n.language?.split("-")[0]
  );

  const socialLinks = [
    {
      name: "LinkedIn",
      description: t("footerLinkedinDescription"),
      href: contactInfo.linkedin,
      icon: LinkedinIcon,
    },
    {
      name: "GitHub",
      description: t("footerGithubDescription"),
      href: contactInfo.github,
      icon: GithubIcon,
    },
    {
      name: t("footerEmail"),
      description: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
    },
    {
      name: t("footerPhone"),
      description: contactInfo.phone,
      href: "tel:+93788255356",
      icon: Phone,
    },
  ];

  
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!formRef.current || isSending) return;

  setIsSending(true);
  setStatus("");

  try {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      throw new Error("EmailJS Public Key is missing.");
    }

    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      {
        publicKey: publicKey,
        
      }
    );

    setStatus("success");
    formRef.current.reset();
  } catch (error) {
    console.error("EmailJS error:", error);
        console.log({
      serviceId: Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID),
      templateId: Boolean(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
      publicKey: Boolean(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
    });
    setStatus("error");
  } finally {
    setIsSending(false);
  }
};


  return (
    <section
      id="contact"
      dir={isPersian ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-black px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* Purple background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-700/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 max-w-2xl sm:mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-9 bg-purple-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-purple-300 sm:text-sm">
              {t("footerSubtitle")}
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("footerHeading")}{" "}
            <span className="text-purple-400">{t("footerHighlight")}</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
            {t("footerDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact information */}
          <div>
            <h3 className="mb-3 text-xl font-semibold sm:text-2xl">
              {t("footerContactHeading")}
            </h3>

            <p className="mb-7 max-w-lg text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
              {t("footerContactDescription")}
            </p>

            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                const isSocial =
                  link.name === "GitHub" || link.name === "LinkedIn";

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={isSocial ? "_blank" : undefined}
                    rel={isSocial ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/[0.06] sm:p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white sm:h-14 sm:w-14">
                      <Icon size={21} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white sm:text-base">
                        {link.name}
                      </span>

                      <span className="mt-1 block break-all text-xs text-gray-400 transition-colors group-hover:text-purple-200 sm:text-sm">
                        {link.description}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="shrink-0 text-gray-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-300"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-gray-400 sm:text-base">
              <MapPin size={19} className="shrink-0 text-purple-400" />
              <span>{t("footerLocation")}</span>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-[#15101E] via-[#0D0B12] to-[#080808] p-5 sm:p-7 lg:p-8">
            <div className="mb-7">
              <h3 className="text-xl font-semibold sm:text-2xl">
                {t("footerFormHeading")}
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-400 sm:text-base">
                {t("footerFormDescription")}
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="from_name"
                  className="mb-2 block text-sm font-medium text-gray-300 sm:text-base"
                >
                  {t("footerNameLabel")}
                </label>

                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  placeholder={t("footerNamePlaceholder")}
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 sm:text-base"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reply_to"
                  className="mb-2 block text-sm font-medium text-gray-300 sm:text-base"
                >
                  {t("footerEmailLabel")}
                </label>

                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  placeholder={t("footerEmailPlaceholder")}
                  autoComplete="email"
                  required
                  maxLength={150}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 sm:text-base"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-300 sm:text-base"
                >
                  {t("footerSubjectLabel")}
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t("footerSubjectPlaceholder")}
                  required
                  maxLength={150}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 sm:text-base"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-300 sm:text-base"
                >
                  {t("footerMessageLabel")}
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t("footerMessagePlaceholder")}
                  required
                  minLength={10}
                  maxLength={5000}
                  className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 sm:text-base"
                />
              </div>

              {/* Success message */}
              {status === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm leading-6 text-green-300 sm:text-base"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  <span>{t("footerSuccessMessage")}</span>
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300 sm:text-base"
                >
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <span>{t("footerErrorMessage")}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSending}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
              >
                {isSending ? t("footerSending") : t("footerSendButton")}

                {!isSending && (
                  <Send
                    size={18}
                    className={`transition-transform ${
                      isPersian
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
