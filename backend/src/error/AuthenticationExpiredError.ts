export class AuthenticationExpiredError extends Error {
  code: 401

  constructor() {
    super("Token expired");
    this.code = 401;
  }
}