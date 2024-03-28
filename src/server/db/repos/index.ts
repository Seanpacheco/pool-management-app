import { UsersRepository } from './users';
import { AccountsRepository } from './accounts';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  accounts: AccountsRepository;
}

export { UsersRepository, AccountsRepository };
export type { IExtensions };
