export function Button({ children, onClick, disabled }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-50"
    >
      <span>{children}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  )
}