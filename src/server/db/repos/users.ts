import { IDatabase, IMain } from 'pg-promise';
import { users as sql } from '../sql';
import { db } from '../connection';
import { AppUserUserId } from '../schemas/public/AppUser';

export class UsersRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}
  findOrCreate(user_id: AppUserUserId | string | undefined) {
    return db.task('findOrCreate', async (t) => {
      const user = await t.oneOrNone(sql.find, user_id);
      return user || (await t.one(sql.add, user_id));
    });
  }
}
