// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { accountAccountId, type AccountAccountId } from './Account';
import { z } from 'zod';

/** Identifier type for public.site */
export type SiteSiteId = string & { __brand: 'SiteSiteId' };

/** Represents the table public.site */
export default interface Site {
  site_id: SiteSiteId;

  account_id: AccountAccountId;

  address: string | null;

  postal_code: string | null;

  phone: string | null;

  email: string | null;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.site */
export interface SiteInitializer {
  /** Default value: gen_random_uuid() */
  site_id?: SiteSiteId;

  account_id: AccountAccountId;

  address?: string | null;

  postal_code?: string | null;

  phone?: string | null;

  email?: string | null;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.site */
export interface SiteMutator {
  site_id?: SiteSiteId;

  account_id?: AccountAccountId;

  address?: string | null;

  postal_code?: string | null;

  phone?: string | null;

  email?: string | null;

  created_at?: Date;

  updated_at?: Date;
}

export interface ServerSiteResponse {
  data: Site[];
}

export const siteSiteId = z.string().uuid() as unknown as z.Schema<SiteSiteId>;

export const site = z.object({
  site_id: siteSiteId,
  account_id: accountAccountId,
  address: z.string().nullable(),
  postal_code: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
}) as unknown as z.Schema<Site>;

export const siteInitializer = z.object({
  site_id: siteSiteId.optional(),
  account_id: accountAccountId,
  address: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<SiteInitializer>;

export const siteMutator = z.object({
  site_id: siteSiteId.optional(),
  account_id: accountAccountId.optional(),
  address: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
}) as unknown as z.Schema<SiteMutator>;
