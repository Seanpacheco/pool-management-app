import { BaseEntity } from '@/client/types';

export type Account = {
  name: string;
  phone: string;
  email: string;
  sites: number;
  state: string;
} & BaseEntity;
