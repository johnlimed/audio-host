import { InputError } from "./InputError";

export class AlreadyExistError extends InputError {
  code: 400

  constructor(reason?: string) {
    super(reason ? `${reason} already exists` : "Already exists");
    this.code = 400;
  }
}