import { PRESENTS, type Present } from "@/constants/presents";

export const getPresents = async (options?: {
  delay?: number;
  empty?: boolean;
  error?: boolean;
}): Promise<Present[]> => {
  const { delay = 1000, empty = false, error = false } = options || {};

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (error) {
    throw new Error("선물 데이터를 불러오는데 실패했습니다.");
  }

  if (empty) {
    return [];
  }

  return PRESENTS;
};
