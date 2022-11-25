import { STATUS_CODES } from 'http'
import { FastifyReply } from 'fastify'

export class HttpResponse {
  private async jsonResponse(reply: FastifyReply, code: number, message?: unknown): Promise<any> {
    return reply.type('application/json').code(code).send(message)
  }

  public async ok<T>(res: FastifyReply, dto?: T): Promise<any> {
    return this.jsonResponse(res, 200, dto || STATUS_CODES[200])
  }

  public async created(res: FastifyReply): Promise<any> {
    return this.jsonResponse(res, 201, STATUS_CODES[201])
  }

  public async badRequest<T>(res: FastifyReply, messages?: T): Promise<any> {
    return this.jsonResponse(res, 400, { code: STATUS_CODES[400], message: messages })
  }

  public async unauthorized(res: FastifyReply, message?: string): Promise<any> {
    return this.jsonResponse(res, 401, { code: STATUS_CODES[401], message: message })
  }

  public async forbidden(res: FastifyReply, message?: string): Promise<any> {
    return this.jsonResponse(res, 403, { code: STATUS_CODES[403], message: message })
  }

  public async notFound(res: FastifyReply, message?: string): Promise<any> {
    return this.jsonResponse(res, 404, { code: STATUS_CODES[404], message: message })
  }

  public async conflict(res: FastifyReply): Promise<any> {
    return this.jsonResponse(res, 409, STATUS_CODES[409])
  }

  public async internalServerError(res: FastifyReply, message?: string): Promise<any> {
    console.error(message)
    return this.jsonResponse(res, 500, { code: STATUS_CODES[500], message: message })
  }
}
