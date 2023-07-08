export class User {
  constructor(private _id: number, private email: string) {}

  public get id() {
    return this._id;
  }

  isSame(user: User): boolean {
    return this._id === user.id;
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
    };
  }
}

export const DummyUser = new User(0, 'john.doe@gmail.com');
