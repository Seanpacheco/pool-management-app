import { BaseEntity } from '@/client/types';

export type Installation = {
  installation_id: string;
  site_id: string;
  name: string;
  type: string | null;
  shape: string | null;
  length: number | null;
  width: number | null;
  depth: number | null;
  gallons: number | null;
} & BaseEntity;
