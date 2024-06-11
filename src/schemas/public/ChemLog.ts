// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { installationInstallationId, type InstallationInstallationId } from './Installation';
import { z } from 'zod';

/** Identifier type for public.chem_log */
export type ChemLogLogId = string & { __brand: 'ChemLogLogId' };

/** Represents the table public.chem_log */
export default interface ChemLog {
  log_id: ChemLogLogId;

  installation_id: InstallationInstallationId;

  created_at: Date;

  updated_at: Date;

  sanitizer_level: number | null;

  ph_level: number | null;

  alkalinity_level: number | null;

  cyanuric_acid_level: number | null;

  total_dissolved_solids_level: number | null;

  calcium_level: number | null;

  log_date: Date;

  sanitizer_type: string | null;
}

/** Represents the initializer for the table public.chem_log */
export interface ChemLogInitializer {
  /** Default value: gen_random_uuid() */
  log_id?: ChemLogLogId;

  installation_id: InstallationInstallationId;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;

  sanitizer_level?: number | null;

  ph_level?: number | null;

  alkalinity_level?: number | null;

  cyanuric_acid_level?: number | null;

  total_dissolved_solids_level?: number | null;

  calcium_level?: number | null;

  log_date: Date;

  sanitizer_type?: string | null;
}

/** Represents the mutator for the table public.chem_log */
export interface ChemLogMutator {
  log_id?: ChemLogLogId;

  installation_id?: InstallationInstallationId;

  created_at?: Date;

  updated_at?: Date;

  sanitizer_level?: number | null;

  ph_level?: number | null;

  alkalinity_level?: number | null;

  cyanuric_acid_level?: number | null;

  total_dissolved_solids_level?: number | null;

  calcium_level?: number | null;

  log_date?: Date;

  sanitizer_type?: string | null;
}

export const chemLogLogId = z.string() as unknown as z.Schema<ChemLogLogId>;

export const chemLog = z.object({
  log_id: chemLogLogId,
  installation_id: installationInstallationId,
  created_at: z.date(),
  updated_at: z.date(),
  sanitizer_level: z.number().nullable(),
  ph_level: z.number().nullable(),
  alkalinity_level: z.number().nullable(),
  cyanuric_acid_level: z.number().nullable(),
  total_dissolved_solids_level: z.number().nullable(),
  calcium_level: z.number().nullable(),
  log_date: z.date(),
  sanitizer_type: z.string().nullable(),
}) as unknown as z.Schema<ChemLog>;

export const chemLogInitializer = z.object({
  log_id: chemLogLogId.optional(),
  installation_id: installationInstallationId,
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  sanitizer_level: z.number().optional().nullable(),
  ph_level: z.number().optional().nullable(),
  alkalinity_level: z.number().optional().nullable(),
  cyanuric_acid_level: z.number().optional().nullable(),
  total_dissolved_solids_level: z.number().optional().nullable(),
  calcium_level: z.number().optional().nullable(),
  log_date: z.date(),
  sanitizer_type: z.string().optional().nullable(),
}) as unknown as z.Schema<ChemLogInitializer>;

export const chemLogMutator = z.object({
  log_id: chemLogLogId.optional(),
  installation_id: installationInstallationId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  sanitizer_level: z.number().optional().nullable(),
  ph_level: z.number().optional().nullable(),
  alkalinity_level: z.number().optional().nullable(),
  cyanuric_acid_level: z.number().optional().nullable(),
  total_dissolved_solids_level: z.number().optional().nullable(),
  calcium_level: z.number().optional().nullable(),
  log_date: z.date().optional(),
  sanitizer_type: z.string().optional().nullable(),
}) as unknown as z.Schema<ChemLogMutator>;
