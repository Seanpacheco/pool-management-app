// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { z } from 'zod';

/** Identifier type for public.app_user */
export type AppUserUserId = string & { __brand: 'AppUserUserId' };

/** Represents the table public.app_user */
export default interface AppUser {
  user_id: AppUserUserId;

  first_name: string | null;

  last_name: string | null;

  email: string | null;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.app_user */
export interface AppUserInitializer {
  user_id: AppUserUserId;

  first_name?: string | null;

  last_name?: string | null;

  email?: string | null;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.app_user */
export interface AppUserMutator {
  user_id?: AppUserUserId;

  first_name?: string | null;

  last_name?: string | null;

  email?: string | null;

  created_at?: Date;

  updated_at?: Date;
}

export const appUserUserId = z.string() as unknown as z.Schema<AppUserUserId>;

export const appUser = z.object({
  user_id: appUserUserId,
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
}) as unknown as z.Schema<AppUser>;

export const appUserInitializer = z.object({
  user_id: appUserUserId,
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<AppUserInitializer>;

export const appUserMutator = z.object({
  user_id: appUserUserId.optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<AppUserMutator>;