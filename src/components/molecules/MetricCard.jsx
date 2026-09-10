export function MetricCard({ icon, text }) {
  return (
    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}