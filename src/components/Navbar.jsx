
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Languages,
  ChevronDown,
  Check,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLanguage = i18n.language.startsWith("fa")
    ? "fa"
    : "en";

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "fa" ? "rtl" : "ltr";

    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setLanguageOpen(false);
  };

  const languageSelector = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setLanguageOpen((open) => !open)}
        aria-label={t("nav.changeLanguage", "Change language")}
        aria-expanded={languageOpen}
        className="group flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/15 px-3.5 py-2.5 text-accent-light transition-all duration-300 hover:border-accent hover:bg-primary/30 active:scale-95"
      >
        <Languages
          size={20}
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
        <div className="absolute right-0 top-full z-[60] mt-3 w-40 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl">
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
  );

  return (
    <header className="relative z-50 w-full bg-background">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 sm:px-6 md:py-6">

        {/* Logo: Left side */}
        <a
          href="#home"
          onClick={closeMobileMenu}
          className="relative isolate shrink-0 text-2xl font-extrabold tracking-tight text-foreground transition-colors duration-300 hover:text-accent-light sm:text-3xl"
        >
          <span className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-primary/30 blur-2xl" />
          Maryam<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-bold text-foreground transition-colors duration-300 hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}

          {languageSelector}
        </div>

        {/* Mobile Menu Button: Right side */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen((open) => !open);
            setLanguageOpen(false);
          }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/50 bg-primary/15 text-accent-light transition-all duration-300 hover:border-accent hover:bg-primary/30 active:scale-95 md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full z-50 border-b border-border bg-background/95 shadow-xl backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-5 sm:px-6">

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-xl px-4 py-3 text-base font-bold text-foreground transition-all duration-200 hover:bg-primary/20 hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-2 border-t border-border pt-4">
            {languageSelector}
          </div>
        </div>
      </div>
    </header>
  );
}
