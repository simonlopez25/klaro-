export function Badge({ text, type = "success" }) {
  const containerStyles =
    type === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  const dotStyles =
    type === "success" ? "bg-emerald-500" : "bg-blue-500";

  return (
    <div
      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs ${containerStyles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotStyles}`}></span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
