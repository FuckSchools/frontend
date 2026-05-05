import * as z from "zod";
export const pathSchema = z.string().regex( /^\/[a-zA-Z0-9\-\/]*$/ )

export const methodEnumSchema = z.enum( [ 'GET', 'POST', 'PUT', 'DELETE' ] )

export type methodEnum = z.infer<typeof methodEnumSchema>

export const BACKEND_URL = 'http://localhost:4000';

export const headerSchema = z.record( z.string(), z.string() );

export const errorResponseSchema = z.object({
  error: z.string()
});