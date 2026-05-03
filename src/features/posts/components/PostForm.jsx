import { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'
import { POST_CONFIG } from '../../../utils/constants'

export default function PostForm({ onPostCreated, subjectId = null }) {
  const [content, setContent] = useState('')
  const { loading, error, submit } = useCreatePost({ onSuccess: onPostCreated, subjectId })

  const remaining = POST_CONFIG.maxLength - content.length
  const isOverLimit = remaining < 0
  const canSubmit = !loading && content.trim() && !isOverLimit

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await submit(content)
    if (!error) setContent('')
  }

  return (
    <form onSubmit={handleSubmit}
      style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#1e3a8a', margin: '0 0 12px' }}>
        Nueva publicación
      </p>
      <textarea
        placeholder="¿Qué querés compartir con tu comunidad?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={POST_CONFIG.maxLength}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: '10px',
          border: '1.5px solid #e2e8f0', background: '#f8fafc',
          fontSize: '14px', color: '#0f172a', outline: 'none',
          fontFamily: 'Inter, sans-serif', resize: 'none', transition: 'border-color 0.2s, background 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
        <span style={{ fontSize: '12px', color: isOverLimit ? '#dc2626' : remaining < 50 ? '#f59e0b' : '#94a3b8' }}>
          {remaining} caracteres
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {error && <p style={{ fontSize: '12px', color: '#dc2626', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={!canSubmit}
            style={{
              padding: '8px 20px', borderRadius: '8px', border: 'none',
              background: canSubmit ? '#fbbf24' : '#e2e8f0',
              color: canSubmit ? '#1e3a8a' : '#94a3b8',
              fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif',
              cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { if (canSubmit) e.target.style.background = '#f59e0b' }}
            onMouseLeave={(e) => { if (canSubmit) e.target.style.background = '#fbbf24' }}
          >
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </div>
    </form>
  )
}
