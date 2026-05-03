import Header from '../ui/Header'
import Footer from '../ui/Footer'

export default function PageLayout({ children, actions }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Header actions={actions} />
      <main style={{ flex: 1, width: '100%', maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
