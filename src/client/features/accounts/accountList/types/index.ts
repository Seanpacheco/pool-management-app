import { BaseEntity } from '@/client/types';

export type Account = {
  account_id: string;
  account_name: string;
  phone: string;
  email: string;
} & BaseEntity;
