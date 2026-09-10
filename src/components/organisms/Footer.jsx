export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-slate-900">KLARO</span>
          <span>•</span>
          <span>Plataforma Segura para Equipos Comerciales y de Gestión</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>© 2026 Klaro Technologies</span>
          <span className="hover:text-slate-900 cursor-pointer">
            Garantía de Privacidad RGPD
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            Declaración de Accesibilidad (WCAG 2.1 AA)
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            Soporte para Empresas
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
          <span>Todos los servicios activos</span>
        </div>
      </div>
    </footer>
  );
}

