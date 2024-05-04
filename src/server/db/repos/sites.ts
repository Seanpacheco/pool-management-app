import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { sites as sql } from '../sql';
import { db } from '../connection';
import Site from '../schemas/public/Site';
import AppUser from '../schemas/public/AppUser';

export class SitesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  // Adds a new record and returns the full object;
  add(values: {
    account_id: string | undefined;
    address: string;
    postal_code: string;
    email: string;
    phone: string;
  }): Promise<Site> {
    return db.one(sql.add, {
      account_id: values.account_id,
      address: values.address,
      postal_code: values.postal_code,
      email: values.email,
      phone: values.phone,
    });
  }
  find(account_id: string | Promise<AppUser>): Promise<Site[]> {
    return db.manyOrNone(sql.find, account_id);
  }
  remove(site_id: string): Promise<number> {
    return db.result(sql.remove, site_id, (r: IResult) => r.rowCount);
  }
}
