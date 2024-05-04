import { UsersRepository } from './users';
import { AccountsRepository } from './accounts';
import { SitesRepository } from './sites';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  accounts: AccountsRepository;
  sites: SitesRepository;
}

export { UsersRepository, AccountsRepository, SitesRepository };
export type { IExtensions };
