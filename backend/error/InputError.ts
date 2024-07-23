export class InputError extends Error {
  code: 400

  constructor(reason?: string) {
    super(reason ? `Input error: ${reason}` : "Input error");
    this.code = 400;
  }
}