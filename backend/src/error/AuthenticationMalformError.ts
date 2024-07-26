export class AuthenticationMalformError extends Error {
  code: 401

  constructor() {
    super("Token Malformed");
    this.code = 401;
  }
}