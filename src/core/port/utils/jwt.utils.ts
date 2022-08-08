export type JwtResponse<T> = {
  error?: Error;
  message?: string;
  token?: string;
  decoded?: T;
};

interface JwtInterface {
  sign(payload: any): JwtResponse<string>;

  verify<T>(payload: any): JwtResponse<T>;
}

export class JWT implements JwtInterface {
  sign(payload: any): JwtResponse<string> {
    return {};
  }

  verify<T>(payload: any): JwtResponse<T> {
    return {};
  }
}
