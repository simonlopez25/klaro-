export function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs py-2 px-6 flex justify-between items-center font-medium">
      <span>
        ⚡ Ahorra un promedio de 4 horas semanales por persona eliminando el
        formateo manual de Excel.
      </span>
      <span className="hidden md:inline underline cursor-pointer">
        🔒 Procesamiento seguro en navegador: tus clientes nunca tocan
        servidores externos
      </span>
    </div>
  );
}
