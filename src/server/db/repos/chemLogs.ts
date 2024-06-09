import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { chemLogs as sql } from '../sql';
import { db } from '../connection';
import ChemLog from '../schemas/public/ChemLog';
import AppUser from '../schemas/public/AppUser';

export class ChemLogsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  // Adds a new record and returns the full object;
  add(values: {
    installation_id: string;
    log_date: string;
    sanitizer_level: number;
    sanitizer_type: string;
    ph_level: number;
    alkalinity_level: number | null;
    calcium_level: number | null;
    total_dissolved_solids_level: number | null;
    cynauric_acid_level: number | null;
  }): Promise<ChemLog> {
    return db.one(sql.add, {
      installation_id: values.installation_id,
      log_date: values.log_date,
      sanitizer_level: values.sanitizer_level,
      sanitizer_type: values.sanitizer_type,
      ph_level: values.ph_level,
      alkalinity_level: values.alkalinity_level,
      calcium_level: values.calcium_level,
      total_dissolved_solids_level: values.total_dissolved_solids_level,
      cynauric_acid_level: values.cynauric_acid_level,
    });
  }
  find(installation_id: string | Promise<AppUser>, startDate: string, endDate: string): Promise<ChemLog[]> {
    return db.manyOrNone(sql.find, [installation_id, startDate, endDate]);
  }
  remove(log_id: string): Promise<number> {
    return db.result(sql.remove, log_id, (r: IResult) => r.rowCount);
  }
}
