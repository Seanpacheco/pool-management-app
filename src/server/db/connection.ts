import pgPromise, { IInitOptions, IDatabase } from 'pg-promise';
import { cn } from './../.././../db-config';
import { Diagnostics } from './diagnostics';
import { UsersRepository } from './repos/index';
import { AccountsRepository } from './repos/index';
import { SitesRepository } from './repos/index';
import { InstallationsRepository } from './repos/index';
import { IExtensions } from './repos/index';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
  // Extending the database protocol with our custom repositories;

  extend(obj: ExtendedProtocol) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.users = new UsersRepository(obj, pgp);
    obj.accounts = new AccountsRepository(obj, pgp);
    obj.sites = new SitesRepository(obj, pgp);
    obj.installations = new InstallationsRepository(obj, pgp);
  },
};

const pgp = pgPromise(initOptions);

const db = pgp(cn);

Diagnostics.init(initOptions);

export { db, pgp };
