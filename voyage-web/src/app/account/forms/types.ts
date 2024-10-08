import { z } from "zod";

export const editAccountFormSchema = z.object({
    fullname: z.string(),
    username: z.string().min(6),
    website: z.string().url(),
})