import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://api-dev.pockey.pics";

export const main = async () => {
  const response = await fetch(`${baseUrl}/docs/swagger-ui-init.js`);
  const text = await response.text();
  const match = text.match(/let options = ({[\s\S]*?});\n/);

  if (!match) {
    console.error("Cannot find options from swagger-ui-init.js");
    return;
  }

  const { swaggerDoc } = JSON.parse(match[1]);
  const file = path.join(import.meta.dirname, "../src/api/openapi.json");
  await fs.writeFile(file, JSON.stringify(swaggerDoc, null, 2));
  console.log(`Saved to ${file}`);
};

await main();
