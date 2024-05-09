import { BaseEntity } from '@/client/types';

export type Site = {
  site_id: string;
  address: string;
  postal_code: string;
  phone: string;
  email: string;
} & BaseEntity;
