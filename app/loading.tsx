export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent animate-spin rounded-full" />
        <p className="text-slate-400">Loading BridgeSkill...</p>
      </div>
    </div>
  );
}
