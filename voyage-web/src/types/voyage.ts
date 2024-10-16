import { z } from "zod";

const CreateVoyageSchema= z.object({
  voyageName: z.string().min(3).max(100),
  voyageDestination: z.string().min(3).max(100),
});

type CreateVoyageSchemaType = z.infer<typeof CreateVoyageSchema>;

export { CreateVoyageSchema, type CreateVoyageSchemaType };

