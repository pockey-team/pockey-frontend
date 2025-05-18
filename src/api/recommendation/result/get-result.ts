import { faker } from "@faker-js/faker/locale/ko";
import type { Present } from "@/constants/presents";

interface ResultItem {
  result: Present;
  nextPick: Present[];
}

export const getResult = async (): Promise<ResultItem[]> => {
  const delay = Math.floor(Math.random() * 700) + 300;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const categories = ["product", "gadget", "electronics", "fashion", "shoes"];

  const results: ResultItem[] = Array.from({ length: 3 }, (_, resultIndex) => {
    const category = faker.helpers.arrayElement(categories);
    const uniqueId = `result_${Date.now()}_${resultIndex}`;

    const resultPresent: Present = {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(["add", "default", undefined]) as
        | "add"
        | "default"
        | undefined,
      title: faker.commerce.productName(),
      content: faker.commerce.productDescription(),
      price: `${faker.commerce.price({ min: 20000, max: 500000 })}`,
      description: faker.commerce.productDescription(),
      image: `https://loremflickr.com/400/400/${category}?lock=${uniqueId}`,
      receiver: faker.person.fullName(),
    };

    const nextPick: Present[] = Array.from({ length: 3 }, (_, index) => {
      const nextCategory = faker.helpers.arrayElement(categories);
      const nextUniqueId = `next_${Date.now()}_${resultIndex}_${index}`;

      return {
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement(["add", "default", undefined]) as
          | "add"
          | "default"
          | undefined,
        title: faker.commerce.productName(),
        content: faker.commerce.productDescription(),
        price: `${faker.commerce.price({ min: 10000, max: 300000 })}원`,
        description: faker.commerce.productDescription(),
        image: `https://loremflickr.com/300/300/${nextCategory}?lock=${nextUniqueId}`,
        receiver: faker.person.fullName(),
      };
    });

    return {
      result: resultPresent,
      nextPick,
    };
  });

  return results;
};
