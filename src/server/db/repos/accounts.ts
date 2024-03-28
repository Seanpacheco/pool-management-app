import { IDatabase, IMain } from 'pg-promise';
import { accounts as sql } from '../sql';
import { db } from '../connection';
import Account from '../schemas/public/Account';
import AppUser from '../schemas/public/AppUser';

export class AccountsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  // Adds a new record and returns the full object;
  add(values: { user_id: string | undefined; account_name: string; email: string; phone: string }): Promise<Account> {
    return db.one(sql.add, {
      user_id: values.user_id,
      account_name: values.account_name,
      email: values.email,
      phone: values.phone,
    });
  }
  find(user_id: string | Promise<AppUser>): Promise<Account[]> {
    return db.one(sql.find, user_id);
  }
}
