export function DropZone({ selectedFile, onFileSelect, isDragging, onDragOver, onDragLeave, onDrop }) {
  return (
    <div 
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative group border-2 border-dashed rounded-2xl p-10 transition-all flex flex-col items-center justify-center cursor-pointer bg-[#111827] shadow-xl ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-950/30 scale-[1.01]' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform border border-slate-700">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>

      <p className="text-sm font-semibold text-slate-200 text-center mb-1">
        {selectedFile ? (
          <span className="text-indigo-400 font-bold">{selectedFile.name}</span>
        ) : (
          <span>Arrastra tu archivo aquí o <span className="text-indigo-400 underline underline-offset-4">selecciónalo</span></span>
        )}
      </p>
      <p className="text-xs text-slate-400">Compatible con Microsoft Excel (.xlsx, .xls) y CSV</p>

      <label className="absolute inset-0 cursor-pointer">
        <input type="file" accept=".csv, .xlsx, .xls" onChange={(e) => onFileSelect(e.target.files[0])} className="hidden" />
      </label>
    </div>
  )
}