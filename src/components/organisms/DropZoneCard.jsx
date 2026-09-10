import { useState } from "react";
import { DropZone } from "./DropZone";

export function DropZoneCard({ selectedFile, onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center text-xs font-bold text-slate-700 pb-4 border-b border-slate-100">
        <span>📂 Paso 1: Arrastra tu archivo Excel o CSV</span>
        <span className="text-slate-400 font-normal">
          Formatos compatibles: .xlsx, .xls, .csv
        </span>
      </div>

      <div className="my-6">
        <DropZone
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span>¿Quieres ver la magia antes de subir el tuyo?</span>
        <button className="inline-flex items-center space-x-1 bg-amber-50 text-amber-700 border border-amber-200 font-semibold rounded-full px-3 py-1 hover:bg-amber-100 transition-colors">
          <span>✨</span>
          <span>Cargar ejemplo con errores comunes (1,420 contactos)</span>
        </button>
      </div>
    </div>
  );
}
