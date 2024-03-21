import pgPromise, { IInitOptions, IDatabase } from 'pg-promise';
import { cn } from './../.././../db-config';
import { Diagnostics } from './diagnostics';
import { UsersRepository } from './repos/users';
import { IExtensions } from './repos/index';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
  // Extending the database protocol with our custom repositories;

  extend(obj: ExtendedProtocol) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.users = new UsersRepository(obj, pgp);
  },
};

const pgp = pgPromise(initOptions);

const db = pgp(cn);

Diagnostics.init({});

export { db, pgp };
