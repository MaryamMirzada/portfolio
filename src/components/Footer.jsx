export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-500/20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-7 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-6">
          {/* Logo */}
          <a
            href="#home"
            aria-label="Maryam Mirzada - Home"
            className="group text-2xl font-bold tracking-tight text-white transition-colors duration-300 hover:text-purple-300"
          >
            Maryam
            <span className="text-purple-500 transition-colors duration-300 group-hover:text-purple-300">
              .
            </span>
          </a>

          {/* Copyright */}
          <p className="text-center text-xs leading-6 text-gray-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-medium text-gray-300">Maryam Mirzada</span>.
            All rights reserved.
          </p>

          {/* Back to top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-purple-400"
          >
            <span>Back to top</span>
            <span
              aria-hidden="true"
              className="text-lg transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </a>
        </div>

        {/* Subtle bottom accent */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>
    </footer>
  );
}
