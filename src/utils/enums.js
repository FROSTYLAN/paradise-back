export const sortDirectionEnum = {
  asc: 'asc',
  desc: 'desc'
}

export const loginTypeEnum = {
  email: 'EMAIL',
  mobile: 'MOBILE',
  google: 'GOOGLE',
  facebook: 'FACEBOOK',
  apple: 'APPLE'
}

export const emailSubjectEnum = {
  verifyEmail: 'Verificar Correo',
  verifyAccount: 'Verificar Cuenta',
  resetPassword: 'Restablecer Contraseña'
}

export const smsBodyEnum = {
  verifyEmail: 'Hola, tu código de verificación es: $code',
  verifyAccount:
    'Hola, te has registrado en Paradise, tu código de verificación es: $code',
  resetPassword:
    'Hola, has solicitado el reestablecimiento de tu contraseña, tu código de verificación es: $code'
}

export const userProfileStatusEnum = {
  saved: 1,
  verified: 2
}

export const languageEnum = {
  spanish: 1,
  english: 2,
  french: 3,
  german: 4,
  chinese: 5,
  portuguese: 6
}

export const lookingForEnum = {
  one_night: 1,
  relation: 2,
  friendsWithBenefits: 3,
  scort: 4
}

export const smokerEnum = {
  frequent: 1,
  sometimes: 2,
  never: 3
}

export const ageEnum = {
  min: 18,
  max: 65
}

export const distanceEnum = {
  min: 0,
  max: 999
}

export const subscriptionState = {
  active: 1,
  inactive: 2,
  pending: 3
}

export const verificationType = {
  dni: 1,
  pose: 2
}

export const verificationStatus = {
  created: 1,
  approved: 2,
  rejected: 3
}
