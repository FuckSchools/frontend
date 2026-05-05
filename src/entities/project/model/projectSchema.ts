import z from "zod";

export const projectSchema = z.object( {
  id: z.uuidv4(),
  title: z.string(),
  updatedAt: z.date()
} );
