export class AuthenticationError extends Error {
  code: 401

  constructor() {
    super("Authentication error");
    this.code = 401;
  }
}