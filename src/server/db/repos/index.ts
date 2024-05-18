import { UsersRepository } from './users';
import { AccountsRepository } from './accounts';
import { SitesRepository } from './sites';
import { InstallationsRepository } from './installations';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  accounts: AccountsRepository;
  sites: SitesRepository;
  installations: InstallationsRepository;
}

export { UsersRepository, AccountsRepository, SitesRepository, InstallationsRepository };
export type { IExtensions };
