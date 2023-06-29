export interface PasswordRepository {
  hash(password: string): string;
  match(password: string, hash: string): boolean;
}
