import axios from 'axios'
import https from 'https'

export class HttpClient {
  private readonly client: IHttpClient

  constructor() {
    this.client = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
  }

  async get(url: string, params?: any): Promise<IHttpClientResponse> {
    return this.client.get(url, params)
  }

  async post(url: string, data: any, config: any): Promise<IHttpClientResponse> {
    return this.client.post(url, data, config)
  }
}

interface IHttpClient {
  get: (url: string, params: any) => Promise<IHttpClientResponse>
  post: (url: string, data?: any, config?: any) => Promise<IHttpClientResponse>
}

interface IHttpClientResponse<T = never> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: IHttpClientConfig<T>
  request?: any
}

interface IHttpClientConfig<T = any> {
  url?: string
  method?: any
  baseURL?: string
  data?: T
  headers?: Record<string, string>
  params?: any
}
