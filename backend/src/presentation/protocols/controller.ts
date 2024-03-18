import { HttpResponse } from "./http";

export interface Controller<T = any> {
  handle(req: T): Promise<HttpResponse>
}
