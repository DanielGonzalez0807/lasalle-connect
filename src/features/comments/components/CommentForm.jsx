import { useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment'

export default function CommentForm({ postId, parentId = null, onSuccess, onCancel }) {
  const [content, setContent] = useState('')
  const { loading, error, submit } = useCreateComment({ postId, onSuccess })

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await submit(content, parentId)
    if (!error) setContent('')
  }

  const canSubmit = !loading && content.trim()

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <textarea
        placeholder={parentId ? 'Escribe una respuesta...' : 'Escribe un comentario...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '10px',
          border: '1.5px solid #e2e8f0', background: '#f8fafc',
          fontSize: '13px', color: '#0f172a', outline: 'none',
          fontFamily: 'Inter, sans-serif', resize: 'none', transition: 'border-color 0.2s, background 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
      />
      {error && <p style={{ fontSize: '12px', color: '#dc2626', margin: 0 }}>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        {onCancel && (
          <button type="button" onClick={onCancel}
            style={{
              padding: '7px 16px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
              background: '#fff', color: '#64748b', fontSize: '13px', fontWeight: 600,
              fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
            }}>
            Cancelar
          </button>
        )}
        <button type="submit" disabled={!canSubmit}
          style={{
            padding: '7px 16px', borderRadius: '8px', border: 'none',
            background: canSubmit ? '#1e3a8a' : '#e2e8f0',
            color: canSubmit ? '#fff' : '#94a3b8',
            fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif',
            cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { if (canSubmit) e.target.style.background = '#1e40af' }}
          onMouseLeave={(e) => { if (canSubmit) e.target.style.background = '#1e3a8a' }}
        >
          {loading ? 'Enviando...' : parentId ? 'Responder' : 'Comentar'}
        </button>
      </div>
    </form>
  )
}
