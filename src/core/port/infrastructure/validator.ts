interface ValidatorInterface {
  validate<T>(data: T): Promise<ValidatorResponse>;
}

export type ValidatorResponse = {
  isError: boolean;
  messages: string[];
};

export class Validator implements ValidatorInterface {
  async validate<T>(data: T): Promise<ValidatorResponse> {
    return {
      isError: false,
      messages: [],
    };
  }
}
