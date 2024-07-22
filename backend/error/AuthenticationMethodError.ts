export class AuthenticationMethodError extends Error {
  code: 401

  constructor() {
    super("Unsupported authentication method");
    this.code = 401;
  }
}