export class AppError extends Error {
  constructor(
    readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}
