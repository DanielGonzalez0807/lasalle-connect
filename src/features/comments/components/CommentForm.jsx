import { useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment'
import { Button } from '../../../components/ui'

export default function CommentForm({ postId, parentId = null, onSuccess, onCancel }) {
  const [content, setContent] = useState('')
  const { loading, error, submit } = useCreateComment({ postId, onSuccess })

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await submit(content, parentId)
    if (!error) setContent('')
  }

  return (
    <form className="space-y-3 rounded-2xl border-2 border-lasalle-yellow/30 bg-gradient-to-br from-white to-slate-50 p-5" onSubmit={handleSubmit}>
      <textarea
        id={parentId ? `reply-${parentId}` : `comment-${postId}`}
        name="content"
        placeholder={parentId ? '💬 Escribe una respuesta...' : '💬 Comparte tu comentario...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-lasalle-dark focus:ring-4 focus:ring-lasalle-yellow/20"
      />
      {error && <p className="text-sm text-red-700 font-semibold">{error}</p>}
      <div className="flex flex-wrap items-center gap-3 justify-end">
        {onCancel && (
          <button type="button" className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <Button type="submit" size="sm" disabled={loading || !content.trim()}>
          {loading ? '⏳ Enviando...' : parentId ? 'Responder' : 'Comentar'}
        </Button>
      </div>
    </form>
  )
}
