import { useState } from "react";
import { Navbar } from "../components/organisms/Navbar";
import { TopBanner } from "../components/organisms/TopBanner";
import { DropZoneCard } from "../components/organisms/DropZoneCard";
import { DownloadCard } from "../components/organisms/DownloadCard";
import { Footer } from "../components/organisms/Footer";
import { UseCaseSelector } from "../components/molecules/UseCaseSelector";
import { MetricCard } from "../components/molecules/MetricCard";

export function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

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
          <DownloadCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
