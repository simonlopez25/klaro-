import { Logo } from "../atoms/Logo";
import { Badge } from "../atoms/Badge";

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-slate-600 font-medium">
          <span className="text-blue-600 font-semibold cursor-pointer">
            Limpiador Rápido
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            Plantillas por Departamento
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            Archivos Procesados
          </span>
        </nav>
      </div>
      <div className="flex items-center space-x-4 text-slate-600">
        <Badge text="Cumple RGPD (100% Privado en UE)" />
        <span className="hidden lg:inline text-slate-400">|</span>
        <span className="hidden lg:inline hover:text-slate-900 cursor-pointer">
          Accesibilidad WCAG 2.1 AA
        </span>
        <span className="hidden lg:inline text-slate-400">|</span>
        <div className="hidden lg:flex items-center space-x-2">
          <span className="text-slate-500">Dpto. Ventas &amp; Marketing</span>
          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] border border-indigo-200">
            VM
          </div>
        </div>
      </div>
    </header>
  );
}
