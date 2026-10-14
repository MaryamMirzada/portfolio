import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
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
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-bold text-foreground transition-all duration-300 hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-button border border-border p-1">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              aria-pressed={i18n.language === "en"}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300 hover:text-accent-light ${
                i18n.language === "en"
                  ? "bg-primary text-foreground"
                  : "text-muted"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("fa")}
              aria-pressed={i18n.language === "fa"}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300 hover:text-accent-light ${
                i18n.language === "fa"
                  ? "bg-primary text-foreground"
                  : "text-muted"
              }`}
            >
              دری
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
