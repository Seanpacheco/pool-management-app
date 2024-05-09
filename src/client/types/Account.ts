// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { appUserUserId, type AppUserUserId } from './AppUser';
import { z } from 'zod';

/** Identifier type for public.account */
export type AccountAccountId = string & { __brand: 'AccountAccountId' };

/** Represents the table public.account */
export default interface Account {
  account_id: AccountAccountId;

  user_id: AppUserUserId;

  account_name: string | null;

  phone: string | null;

  email: string | null;

  created_at: Date;

  updated_at: Date;
}
export interface ServerAccountResponse {
  data: Account[];
}
/** Represents the initializer for the table public.account */
export interface AccountInitializer {
  /** Default value: gen_random_uuid() */
  account_id?: AccountAccountId;

  user_id: AppUserUserId;

  account_name?: string | null;

  phone?: string | null;

  email?: string | null;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.account */
export interface AccountMutator {
  account_id?: AccountAccountId;

  user_id?: AppUserUserId;

  account_name?: string | null;

  phone?: string | null;

  email?: string | null;

  created_at?: Date;

  updated_at?: Date;
}

export const accountAccountId = z.string().uuid() as unknown as z.Schema<AccountAccountId>;

export const account = z.object({
  account_id: accountAccountId,
  user_id: appUserUserId,
  account_name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
}) as unknown as z.Schema<Account>;

export const accountInitializer = z.object({
  account_id: accountAccountId.optional(),
  user_id: appUserUserId,
  account_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<AccountInitializer>;

export const accountMutator = z.object({
  account_id: accountAccountId.optional(),
  user_id: appUserUserId.optional(),
  account_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<AccountMutator>;
