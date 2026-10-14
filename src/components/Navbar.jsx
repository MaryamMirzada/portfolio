import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages, ChevronDown, Check } from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);

  const currentLanguage = i18n.language.startsWith("fa") ? "fa" : "en";

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

    setLanguageOpen(false);
  };

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="w-full bg-background">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">
        {/* Logo */}
        <a
          href="#home"
          className="relative isolate shrink-0 text-3xl font-extrabold tracking-tight text-foreground transition-colors duration-300 hover:text-accent-light"
        >
          <span className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-primary/30 blur-2xl" />
          Maryam<span className="text-accent">.</span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-14 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-bold text-foreground transition-colors duration-300 hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}

          {/* Language Icon */}

          {/* Language Icon */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((open) => !open)}
              aria-label={t("nav.changeLanguage", "Change language")}
              aria-expanded={languageOpen}
              className="group flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/15 px-3.5 py-2.5 text-accent-light shadow-[0_0_15px_rgba(124,58,237,0.08)] transition-all duration-300 hover:border-accent hover:bg-primary/30 hover:shadow-[0_0_18px_rgba(124,58,237,0.2)] active:scale-95"
            >
              <Languages
                size={21}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:rotate-6"
              />

              <span className="text-sm font-semibold">
                {currentLanguage === "en" ? "EN" : "دری"}
              </span>

              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-40 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl">
                <button
                  type="button"
                  onClick={() => changeLanguage("en")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/20 hover:text-accent-light"
                >
                  <span>English</span>
                  {currentLanguage === "en" && (
                    <Check size={16} className="text-accent-light" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => changeLanguage("fa")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/20 hover:text-accent-light"
                >
                  <span>دری</span>
                  {currentLanguage === "fa" && (
                    <Check size={16} className="text-accent-light" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
