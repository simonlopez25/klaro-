export function UseCaseSelector() {
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs min-w-[300px]">
      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
        SELECCIÓN RÁPIDA POR CASO DE USO:
      </span>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200 cursor-pointer">
          <span>📁 Leads de Eventos / Ferias</span>
          <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">
            Activo
          </span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer">
          <span>📊 Base de Datos CRM / Hubspot / Salesforce</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer">
          <span>📑 Facturación y Contabilidad (CIF/NIF)</span>
        </div>
      </div>
    </div>
  );
}
