import { BaseEntity } from '@/client/types';

export type Account = {
  full_count: number;
  account_id: string;
  account_name: string;
  phone: string;
  email: string;
} & BaseEntity;
