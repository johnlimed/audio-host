export class UserExistError extends Error {
  code: 400

  constructor() {
    super("User already exists");
    this.code = 400;
  }
}