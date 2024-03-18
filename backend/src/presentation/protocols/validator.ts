export interface Validator {
  validate(data: any): Error
}
