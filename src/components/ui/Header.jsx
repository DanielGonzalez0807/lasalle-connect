import { Link } from 'react-router-dom'

export default function Header({ brand = 'LaSalle Connect', actions }) {
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-lasalle-dark to-lasalle-blue shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/home" className="flex items-center gap-2 text-2xl font-bold font-display text-white hover:text-lasalle-yellow transition">
          <span>{brand}</span>
          <span className="text-lasalle-yellow">.</span>
        </Link>
        {actions ? (
          <div className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  )
}
