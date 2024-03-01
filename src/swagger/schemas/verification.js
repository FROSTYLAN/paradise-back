export const VerificationByDNI = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    user_id: {
      type: 'integer'
    },
    front: {
      type: 'string'
    },
    back: {
      type: 'string'
    },
    type: {
      type: 'integer'
    },
    status: {
      type: 'integer'
    }
  }
}

export const VerificationByPose = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    user_id: {
      type: 'integer'
    },
    image_01: {
      type: 'string'
    },
    image_02: {
      type: 'string'
    },
    type: {
      type: 'integer'
    },
    status: {
      type: 'integer'
    }
  }
}

export const CreateVerificationByDNI = {
  type: 'object',
  properties: {
    front: {
      type: 'string',
      format: 'binary'
    },
    back: {
      type: 'string',
      format: 'binary'
    }
  }
}

export const CreateVerificationByPose = {
  type: 'object',
  properties: {
    image_01: {
      type: 'string',
      format: 'binary'
    },
    image_02: {
      type: 'string',
      format: 'binary'
    }
  }
}
