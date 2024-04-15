import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3),
  staffCode: z.string().email(),
  password: z.string().min(6),
  customerCode: z.string(),
  customerName: z.string(),
  mobileNo: z.number(),
  dateOfBirth: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  stateCode: z.string(),
  townshipCode: z.string(),
  staffName: z.string(),
  address: z.string(),
  position: z.string(),
  shopCode: z.string(),
  shopName: z.string(),
});

export type Inputs = z.infer<typeof formSchema>;