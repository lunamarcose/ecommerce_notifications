import { FastifyRequest, FastifyReply } from 'fastify'
import { HttpResponse } from '../server/common/HttpResponse'

export abstract class BaseController extends HttpResponse {
  public abstract exec(req: FastifyRequest, reply: FastifyReply): Promise<any>
}
