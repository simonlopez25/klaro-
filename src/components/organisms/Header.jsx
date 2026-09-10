import { Badge } from '../atoms/Badge'

/**
 * Header — variante dark mode (no usada actualmente).
 * El componente activo de navegación es Navbar.jsx.
 * Conservar como referencia si se implementa modo oscuro.
 */
export function Header() {
  return (
    <header className="w-full bg-[#0b0f19] border-b border-slate-800 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
          <span className="font-extrabold tracking-wide text-lg text-slate-100">
            KLARO<span className="text-indigo-400">.</span>
          </span>
        </div>
        <div className="text-xs font-semibold text-indigo-300 bg-indigo-950/60 border border-indigo-800/50 px-3 py-1 rounded-full flex items-center space-x-1">
          <span>🔒 GDPR Compliant</span>
        </div>
      </div>
    </header>
  )
}