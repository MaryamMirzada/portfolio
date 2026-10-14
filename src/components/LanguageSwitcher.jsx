import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);

    const direction = language === "fa" ? "rtl" : "ltr";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className="rounded-lg border border-purple-900 px-3 py-2 text-white transition hover:border-purple-500 hover:shadow-[0_0_15px_rgba(75,22,140,0.35)]"
        aria-pressed={i18n.language === "en"}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("fa")}
        className="rounded-lg border border-purple-900 px-3 py-2 text-white transition hover:border-purple-500 hover:shadow-[0_0_15px_rgba(75,22,140,0.35)]"
        aria-pressed={i18n.language === "fa"}
      >
        دری
      </button>
    </div>
  );
}
