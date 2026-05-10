import { z } from "zod";

const ALLOWED_DOMAINS = ["mail.mcgill.ca", "mcgill.ca"] as const;

export const signInSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address.")
    .refine((val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      return ALLOWED_DOMAINS.includes(domain as (typeof ALLOWED_DOMAINS)[number]);
    }, "Only @mail.mcgill.ca and @mcgill.ca addresses are accepted."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const roleSelectSchema = z.object({
  role: z.enum(["student", "alumnus"], {
    error: "Select your role to continue.",
  }),
});

export type RoleSelectFormValues = z.infer<typeof roleSelectSchema>;
