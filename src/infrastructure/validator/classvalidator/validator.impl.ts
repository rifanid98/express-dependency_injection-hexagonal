import {
  Validator,
  ValidatorResponse,
} from "../../../core/port/infrastructure";
import { validate, ValidationError } from "class-validator";

export class ValidatorImpl implements Validator {
  async validate<T>(data: T): Promise<ValidatorResponse> {
    const dataObj: object = this.convert<T, object>(data);
    const errors: ValidationError[] = await validate(dataObj);
    return {
      isError: errors.length > 0,
      messages: this.getMessage(errors),
    };
  }

  private getMessage(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    errors.map((error) => {
      const constraints = error.constraints;
      Object.keys(constraints).forEach((constraint) => {
        messages.push(constraints[constraint]);
      });
    });

    return messages;
  }

  private convert<T, O>(data: T): O {
    return data as unknown as O;
  }
}
