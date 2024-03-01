export const message = (body) => {
  if (!body.from_user_id) {
    return 'Emisor Id es requerido'
  }

  if (isNaN(Number(body.from_user_id))) {
    return 'Emisor Id no es válido'
  }

  if (!body.to_user_id) {
    return 'Receptor Id es requerido'
  }

  if (isNaN(Number(body.to_user_id))) {
    return 'Receptor Id no es válido'
  }

  if (!body.message?.trim()) {
    return 'Mensaje es requerido'
  }

  return null
}
