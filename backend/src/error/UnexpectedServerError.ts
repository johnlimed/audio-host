export class UnexpectedServerError extends Error {
  code: 500

  constructor(message?: string) {
    super(message || "Unexpected Server Error");
    this.code = 500;
  }
}