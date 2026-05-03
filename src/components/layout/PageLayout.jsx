import Header from '../ui/Header'
import Footer from '../ui/Footer'

export default function PageLayout({ children, actions }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header actions={actions} />
      <main className="flex-1 mx-auto w-full max-w-7xl flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
