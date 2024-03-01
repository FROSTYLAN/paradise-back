import { response400, response500 } from '../../utils/swagger'

export const auth = {
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Login by email',
                value: {
                  email: 'string',
                  password: 'string'
                }
              },
              mobile: {
                summary: 'Login by phone number',
                value: {
                  phone_number: 'string',
                  password: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns an authenticated user',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoggedIn'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/login/google': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns an authenticated user by google',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoggedIn'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/login/facebook': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                access_token: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description:
            'Create profile and returns an authenticated user by facebook',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoggedIn'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/refresh-token': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refresh_token: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns the authentication tokens',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Token'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Register by email',
                value: {
                  email: 'string',
                  password: 'string'
                }
              },
              mobile: {
                summary: 'Register by phone number',
                value: {
                  phone_number: 'string',
                  password: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns a created user',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/register/resend-code/': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Resend registration code by email',
                value: {
                  email: 'string'
                }
              },
              mobile: {
                summary: 'Resend registration code by phone number',
                value: {
                  phone_number: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Resend the registration code'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/verify/account/{token}': {
    get: {
      tags: ['Auth'],
      parameters: [
        {
          in: 'path',
          name: 'token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Verify account by token'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/verify/account': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    code: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    },
                    code: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Verify account by email',
                value: {
                  email: 'string',
                  code: 'string'
                }
              },
              mobile: {
                summary: 'Verify account by phone number',
                value: {
                  phone_number: 'string',
                  code: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Verify account by code'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/forgot-password': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Forgot password by email',
                value: {
                  email: 'string'
                }
              },
              mobile: {
                summary: 'Forgot password by phone number',
                value: {
                  phone_number: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Send the forgot password code'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/forgot-password/resend-code': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Resend forgot password code by email',
                value: {
                  email: 'string'
                }
              },
              mobile: {
                summary: 'Resend forgot password code by phone number',
                value: {
                  phone_number: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Resend the forgot password code'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/verify/reset-password/{token}': {
    get: {
      tags: ['Auth'],
      parameters: [
        {
          in: 'path',
          name: 'token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Verify password reset by token'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/verify/reset-password': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    code: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    },
                    code: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Verify password reset by email',
                value: {
                  email: 'string',
                  code: 'string'
                }
              },
              mobile: {
                summary: 'Verify password reset by phone number',
                value: {
                  phone_number: 'string',
                  code: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Verify password reset by code'
        },
        400: response400,
        500: response500
      }
    }
  },
  '/api/auth/reset-password': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    },
                    confirm_password: {
                      type: 'string'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    phone_number: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    },
                    confirm_password: {
                      type: 'string'
                    }
                  }
                }
              ]
            },
            examples: {
              email: {
                summary: 'Reset password by email',
                value: {
                  email: 'string',
                  password: 'string',
                  confirm_password: 'string'
                }
              },
              mobile: {
                summary: 'Reset password by phone number',
                value: {
                  phone_number: 'string',
                  password: 'string',
                  confirm_password: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Reset password',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoggedIn'
              }
            }
          }
        },
        400: response400,
        500: response500
      }
    }
  }
}
