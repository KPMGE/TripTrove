import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.json(httpResponse.body)
    }
    return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
  }
}
