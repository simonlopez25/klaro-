const API_URL = 'http://localhost:8000/api'

export async function cleanFileBackend(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/clean`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Error al procesar el archivo')
  }

  return await response.json()
}