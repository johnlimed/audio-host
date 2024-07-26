export class ClientError extends Error {
  code: 400

  constructor(message?: string) {
    super(message || "Client Error");
    this.code = 400;
  }
}