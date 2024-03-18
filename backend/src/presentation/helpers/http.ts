import { HttpResponse } from "../protocols"
import { StatusCodes } from 'http-status-codes'

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: StatusCodes.OK
})

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: StatusCodes.BAD_REQUEST,
})

export const serverError = (error: Error): HttpResponse => ({
  body: error,
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
})
