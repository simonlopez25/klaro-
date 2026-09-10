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

export async function downloadExcelBackend(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/download-excel`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Error al descargar el archivo')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const contentDisposition = response.headers.get('Content-Disposition')
  let filename = 'limpio_datas.xlsx'
  
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/)
    if (match) filename = match[1]
  }

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}