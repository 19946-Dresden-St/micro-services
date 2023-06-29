export class User {
  constructor(private id: number, private email: string) {}

  isSame(user: User): boolean {
    return this.id === user.id;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
