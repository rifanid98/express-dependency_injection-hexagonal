export type JwtResponse<T> = {
  isError: boolean;
  error?: Error;
  token?: string;
  decoded?: T;
};

interface JwtInterface {
  sign(payload: any): JwtResponse<string>;

  verify<T>(payload: any): Promise<JwtResponse<T>>;
}

export class JWT implements JwtInterface {
  sign(payload: any): JwtResponse<string> {
    return { isError: false };
  }

  async verify<T>(payload: any): Promise<JwtResponse<T>> {
    return { isError: false };
  }
}
