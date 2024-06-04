import { UsersRepository } from './users';
import { AccountsRepository } from './accounts';
import { SitesRepository } from './sites';
import { InstallationsRepository } from './installations';
import { ChemLogsRepository } from './chemLogs';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  accounts: AccountsRepository;
  sites: SitesRepository;
  installations: InstallationsRepository;
  chemLogs: ChemLogsRepository;
}

export { UsersRepository, AccountsRepository, SitesRepository, InstallationsRepository, ChemLogsRepository };
export type { IExtensions };
