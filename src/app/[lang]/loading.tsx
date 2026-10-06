export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-clay" />
        <p className="font-mono text-xs text-ink-faint">Ładowanie...</p>
      </div>
    </div>
  )
}
