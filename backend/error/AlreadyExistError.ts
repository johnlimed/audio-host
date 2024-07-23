import { InputError } from "./InputError";

export class AlreadyExistError extends InputError {
  code: 400

  constructor() {
    super("Already exists");
    this.code = 400;
  }
}