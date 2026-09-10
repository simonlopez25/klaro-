import { Button } from "../atoms/Button";

export function DownloadCard({ onDownload }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 pb-4 border-b border-slate-100">
          <span>PASO 2: DESCARGA TU ARCHIVO LIMPIO</span>
          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
            Listo en 0.4s
          </span>
        </div>

        <div className="my-6 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">
            Descargar archivo ordenado y sin errores
          </h3>
          <p className="text-xs text-slate-500">
            Se generará un archivo formateado según las normas oficiales de
            HubSpot, Salesforce y Excel corporativo.
          </p>

          <Button onClick={onDownload}>📥 Descargar Excel Limpio (.xlsx)</Button>

          <div className="grid grid-cols-2 gap-2">
            <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs">
              Descargar en CSV (.csv)
            </button>
            <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs">
              Abrir en Google Sheets
            </button>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-100 flex items-center space-x-1.5">
        <span>🛡️</span>
        <span>
          Archivo verificado contra 14 reglas de calidad de datos corporativos.
        </span>
      </div>
    </div>
  );
}
