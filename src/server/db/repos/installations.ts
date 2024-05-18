import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { installations as sql } from '../sql';
import { db } from '../connection';
import Installation from '../schemas/public/Installation';
import AppUser from '../schemas/public/AppUser';

export class InstallationsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  // Adds a new record and returns the full object;
  add(values: {
    site_id: string;
    name: string;
    type: string;
    shape: string;
    length: number;
    width: number;
    depth: number;
    gallons: number;
  }): Promise<Installation> {
    return db.one(sql.add, {
      site_id: values.site_id,
      name: values.name,
      type: values.type,
      shape: values.shape,
      length: values.length,
      width: values.width,
      depth: values.depth,
      gallons: values.gallons,
    });
  }
  find(site_id: string | Promise<AppUser>): Promise<Installation[]> {
    return db.manyOrNone(sql.find, site_id);
  }
  remove(installation_id: string): Promise<number> {
    return db.result(sql.remove, installation_id, (r: IResult) => r.rowCount);
  }
}
