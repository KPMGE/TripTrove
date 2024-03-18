export class MissingParamError extends Error {
  constructor(fieldName: string) {
    super(`Missing field ${fieldName}!`)
    this.name = 'MissingParamError '
  }
}
