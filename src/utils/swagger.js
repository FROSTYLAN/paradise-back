export const response400 = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}

export const response401 = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}

export const response403 = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}

export const response500 = {
  description: 'Server Error',
  content: {
    'application/ json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}
