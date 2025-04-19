import { defineConfig } from "eslint/config";
import tailwind from "eslint-plugin-tailwindcss";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  ...compat.extends("next/core-web-vitals"),
  ...tailwind.configs["flat/recommended"],
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/no-tabs": ["error"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    },
  },
  {
    rules: {
      "tailwindcss/classnames-order": "error",
    },
  },
]);
