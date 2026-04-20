import { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'
import { POST_CONFIG } from '../../../utils/constants'
import s from './PostForm.module.css'

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
    <form className={s.form} onSubmit={handleSubmit}>
      <textarea
        id="post-content"
        name="content"
        placeholder="¿Qué quieres compartir?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={POST_CONFIG.maxLength}
      />
      <div className={s.footer}>
        <span className={`${s.counter} ${isOverLimit ? s.counterOver : ''}`}>
          {remaining} caracteres restantes
        </span>
        {error && <p className={s.error}>{error}</p>}
        <button className={s.btnSubmit} type="submit" disabled={loading || !content.trim() || isOverLimit}>
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  )
}
