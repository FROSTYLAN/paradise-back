export const matchPassword = (passwordLabel, confirmPasswordLabel) => {
  return (value, { req: { body } }) => {
    if (!body[passwordLabel] || !body[confirmPasswordLabel]) {
      return false
    }

    if (body[passwordLabel] !== body[confirmPasswordLabel]) {
      throw new Error('Las contraseñas no coinciden')
    }

    return true
  }
}
