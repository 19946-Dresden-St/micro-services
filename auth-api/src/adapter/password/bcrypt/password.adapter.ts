import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { PasswordRepository } from 'src/repository/password.repository';

@Injectable()
export class PasswordAdapter implements PasswordRepository {
  static ROUND = 10;

  hash(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
  match(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
