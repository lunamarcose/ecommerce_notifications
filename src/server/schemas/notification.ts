export const postNotificationSchema = {
  description: 'Create Notification',
  tags: ['Notifications'],
  summary: 'Create notification and send email',
  body: {
    type: 'object',
    required: ['recipentId', 'subject', 'message', 'severity'],
    properties: {
      recipentId: { type: 'string' },
      senderId: { type: 'string' },
      subject: {
        type: 'string'
      },
      message: {
        type: 'string'
      },
      severity: {
        type: 'number'
      }
    }
  },
  response: {
    200: {
      description: 'Created response',
      $ref: 'notification'
    },
    default: {
      description: 'Error response',
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}

export const getNotificationsSchema = {
  description: 'Get All Notification by User ID',
  tags: ['Notifications'],
  summary: 'Get All Notifications that belongs to an user',
  querystring: {
    type: 'object',
    properties: {
      offset: {
        type: 'number',
        description: 'Set offset to retrieve data'
      },
      limit: {
        type: 'number',
        description: 'Set limit to retrieve data'
      }
    }
  },
  response: {
    200: {
      description: 'Successful get response',
      type: 'object',
      properties: {
        notifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              subject: { type: 'string', description: 'Only returns first 10 characters' },
              message: { type: 'string', description: 'Only returns first 50 characters' },
              recipentId: { type: 'string' },
              senderId: { type: 'string' },
              severity: { type: 'number' },
              readed: { type: 'string', description: 'Timestamp string representation' }
            }
          }
        },
        metadata: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' }
          }
        }
      }
    },
    default: {
      description: 'Error response',
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}

export const getUnreadNotificationsSchema = {
  description: 'Get Unread Notification by User ID',
  tags: ['Notifications'],
  summary: 'Get Unread Notifications that belongs to an user',
  querystring: {
    type: 'object',
    properties: {
      offset: {
        type: 'number',
        description: 'Set offset to retrieve data'
      },
      limit: {
        type: 'number',
        description: 'Set limit to retrieve data'
      }
    }
  },
  response: {
    200: {
      description: 'Successful get response',
      type: 'object',
      properties: {
        notifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              subject: { type: 'string', description: 'Only returns first 10 characters' },
              message: { type: 'string', description: 'Only returns first 50 characters' },
              recipentId: { type: 'string' },
              senderId: { type: 'string' },
              severity: { type: 'number' },
              readed: { type: 'string', description: 'Timestamp string representation' }
            }
          }
        },
        metadata: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            offset: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' }
          }
        }
      }
    },
    default: {
      description: 'Error response',
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}

export const getNotificationSchema = {
  description: 'Get Notification by ID',
  tags: ['Notifications'],
  summary: 'Get Notification Detail',
  response: {
    200: {
      description: 'Successful get response',
      $ref: 'notification'
    },
    default: {
      description: 'Error response',
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}

export const patchNotificationSchema = {
  description: 'Set Notification as readed',
  tags: ['Notifications'],
  summary: 'Read Notification',
  response: {
    200: {
      description: 'Successful post response',
      $ref: 'notification'
    },
    default: {
      description: 'Error response',
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}
