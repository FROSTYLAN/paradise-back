export const handleHttp = (res, data = null, status = 200) => {
  if (!data) {
    return res.status(status).end()
  }

  return res.status(status).json(data)
}

export const success = (res, data = null, status = 200) => {
  return handleHttp(res, data, status)
}

export const created = (res, data = null) => {
  return handleHttp(res, data, 201)
}

export const badRequest = (res, data = null) => {
  return handleHttp(res, data, 400)
}

export const unauthorized = (res) => {
  return handleHttp(res, null, 401)
}

export const forbidden = (res) => {
  return handleHttp(res, null, 403)
}

export const notFound = (res) => {
  return handleHttp(res, null, 404)
}

export const serverError = (res, error) => {
  console.log(`Server error: ${error.message}`)
  return handleHttp(res, null, 500)
}
