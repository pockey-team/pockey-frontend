import { z } from "zod";

export const relationSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  gender: z.string({ message: "성별을 선택해 주세요." }),
  relationship: z.string({ message: "누구에게 줄지 선택해 주세요." }),
  occasion: z.string({ message: "언제 줄지 선택해 주세요." }),
});

export type RelationData = z.infer<typeof relationSchema>;
