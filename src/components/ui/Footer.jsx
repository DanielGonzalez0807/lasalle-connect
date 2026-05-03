export default function Footer({ children }) {
  return (
    <footer className="border-t-2 border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 py-6 text-center text-slate-100">
      {children ?? (
        <p className="flex flex-col items-center justify-center gap-1 sm:flex-row">
          <span className="font-bold font-display text-lg">
            LaSalle<span className="text-lasalle-yellow">.</span>
          </span>
          <span className="text-sm text-slate-300">— Conecta estudiantes, materias y publicaciones</span>
        </p>
      )}
    </footer>
  )
}
