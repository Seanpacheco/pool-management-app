import { UsersRepository } from './users';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
}

export { UsersRepository };
export type { IExtensions };
