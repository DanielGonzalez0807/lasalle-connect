import { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'
import { POST_CONFIG } from '../../../utils/constants'
import { Button } from '../../../components/ui'

export default function PostForm({ onPostCreated, subjectId = null }) {
  const [content, setContent] = useState('')
  const { loading, error, submit } = useCreatePost({ onSuccess: onPostCreated, subjectId })

  const remaining = POST_CONFIG.maxLength - content.length
  const isOverLimit = remaining < 0

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await submit(content)
    if (!error) setContent('')
  }

  return (
    <form className="space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-100">
        <span className="text-2xl">✍️</span>
        <h3 className="text-lg font-semibold font-display text-lasalle-dark">Crear Publicación</h3>
      </div>
      
      <textarea
        id="post-content"
        name="content"
        placeholder="¿Qué quieres compartir con tu comunidad?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        maxLength={POST_CONFIG.maxLength}
        className="min-h-[140px] w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-lasalle-dark focus:bg-white focus:ring-4 focus:ring-lasalle-yellow/20"
      />
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm">
          <p className={isOverLimit ? 'font-semibold text-red-600' : 'text-slate-600'}>
            {remaining > 100 ? `📝 ${remaining} caracteres` : <span className={isOverLimit ? 'text-red-600' : remaining < 50 ? 'text-orange-600' : 'text-slate-600'}>📝 {remaining}</span>}
          </p>
          {error && <p className="text-sm text-red-700 font-semibold">{error}</p>}
        </div>

        <Button type="submit" disabled={loading || !content.trim() || isOverLimit} className="w-full sm:w-auto">
          {loading ? '⏳ Publicando...' : '🚀 Publicar'}
        </Button>
      </div>
    </form>
  )
}
