import * as z from "zod";

export const alterInfoDocFormValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  expires_at: z.string().optional(),
});

export type AlterInfoDocFormValidationSchema = z.infer<
  typeof alterInfoDocFormValidationSchema
>;
