import { useState } from 'react'
import { registerUser, loginUser, logoutUser } from '../services/authService'
import { isInstitutionalEmail, isValidPassword } from '../../../utils/validators'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function validate({ email, password }) {
    if (!isInstitutionalEmail(email)) return 'El correo debe ser institucional (@unisalle.edu.co)'
    if (!isValidPassword(password)) return 'La contraseña debe tener al menos 8 caracteres'
    return null
  }

  async function register({ email, password, fullName }) {
    const validationError = validate({ email, password })
    if (validationError) { setError(validationError); return { error: validationError } }

    setLoading(true)
    setError(null)
    const { data, error } = await registerUser({ email, password, fullName })
    if (error) setError(error.message)
    setLoading(false)
    return { data, error }
  }

  async function login({ email, password }) {
    const validationError = validate({ email, password })
    if (validationError) { setError(validationError); return { error: validationError } }

    setLoading(true)
    setError(null)
    const { data, error } = await loginUser({ email, password })
    if (error) setError(error.message)
    setLoading(false)
    return { data, error }
  }

  async function logout() {
    setLoading(true)
    const { error } = await logoutUser()
    if (error) setError(error.message)
    setLoading(false)
  }

  return { loading, error, register, login, logout }
}
