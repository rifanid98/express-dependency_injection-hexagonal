export interface UserEntityInterface {
  id?: string;
  username?: string;
  password?: string;
}

export class User implements UserEntityInterface {
  id?: string;
  username?: string;
  password?: string;

  isEmpty(): boolean {
    if (this?.id?.length < 1) {
      return true;
    }
    return false;
  }
}
