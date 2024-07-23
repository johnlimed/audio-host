export class AuthorizationError extends Error {
  code: 401

  constructor() {
    super("Authorization error");
    this.code = 401;
  }
}