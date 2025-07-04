export type ErrorResponse = {
  success: false
  errors: string[]
  message: string
  status: number
}

export class ApiError extends Error {
  public readonly response: ErrorResponse

  constructor(response: ErrorResponse) {
    super(response.message)
    this.response = response
  }
}
