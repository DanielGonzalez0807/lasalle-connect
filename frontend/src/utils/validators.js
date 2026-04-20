import { AUTH_CONFIG, POST_CONFIG } from './constants'

export function isInstitutionalEmail(email) {
  return email.trim().toLowerCase().endsWith(`@${AUTH_CONFIG.allowedDomain}`)
}

export function isValidPassword(password) {
  return password.length >= 8
}

export function validatePostContent(content) {
  const trimmed = content.trim()
  if (trimmed.length < POST_CONFIG.minLength) return 'La publicación no puede estar vacía.'
  if (trimmed.length > POST_CONFIG.maxLength)
    return `La publicación no puede superar los ${POST_CONFIG.maxLength} caracteres.`
  return null
}
