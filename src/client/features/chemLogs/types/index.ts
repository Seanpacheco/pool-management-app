import { BaseEntity } from '@/client/types';

export type ChemLog = {
  log_id: string;
  installation_id: string;
  log_date: Date | string;
  created_at: Date;
  sanitizer_level: number;
  sanitizer_type: string;
  ph_level: number;
  alkalinity_level: number | null;
  calcium_level: number | null;
  cyanuric_acid_level: number | null;
  total_dissolved_solids_level: number | null;
} & BaseEntity;
