import { useState } from "react";
import { Navbar } from "../components/organisms/Navbar";
import { TopBanner } from "../components/organisms/TopBanner";
import { DropZoneCard } from "../components/organisms/DropZoneCard";
import { DownloadCard } from "../components/organisms/DownloadCard";
import { Footer } from "../components/organisms/Footer";
import { UseCaseSelector } from "../components/molecules/UseCaseSelector";
import { MetricCard } from "../components/molecules/MetricCard";
import { cleanFileBackend } from "../services/api";
export function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const handleProcess = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const data = await cleanFileBackend(selectedFile);
      setResultData(data);
      alert(`¡Éxito! ${data.duplicates_removed} duplicados eliminados.`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col justify-between">
      <Navbar />
      <TopBanner />

      <main className="max-w-7xl mx-auto w-full p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              Herramienta sin código para Administración, Ventas y Marketing
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Convierte hojas de cálculo desordenadas en datos listos para
              trabajar en segundos
            </h1>
            <p className="text-slate-600 text-sm">
              Arrastra tu archivo de contactos o facturación. Klaro detecta y
              arregla errores ortográficos en correos, separa nombres de
              apellidos, quita registros duplicados y normaliza teléfonos
              automáticamente.
            </p>
          </div>
          <UseCaseSelector />
        </div>

        <div className="flex flex-wrap gap-3">
          <MetricCard
            icon="⚡"
            text="Procesa hasta 50,000 filas en 3 segundos"
          />
          <MetricCard
            icon="🔒"
            text="Cero almacenamiento de datos (100% privado)"
          />
          <MetricCard
            icon="🛡️"
            text="Sin macros ni fórmulas complicadas de Excel"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DropZoneCard
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />

          <div className="space-y-4">
            <DownloadCard />
            {selectedFile && (
              <button
                onClick={handleProcess}
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>
                  {loading
                    ? "Procesando con Pandas..."
                    : "🚀 Ejecutar Limpieza en Backend"}
                </span>
              </button>
            )}
          </div>
        </div>

        {resultData && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Previsualización de datos limpios (Primeras filas):
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 uppercase">
                  <tr>
                    {resultData.preview.length > 0 &&
                      Object.keys(resultData.preview[0]).map((key) => (
                        <th key={key} className="p-2 border-b">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {resultData.preview.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      {Object.values(row).map((val, idx) => (
                        <td key={idx} className="p-2">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
