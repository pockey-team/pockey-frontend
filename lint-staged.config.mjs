import biome from "./biome.json" with { type: "json" };

/**
 * @param {string} file
 * @returns {boolean}
 */
const isBiomeIncluded = (file) => {
  return !biome.files.includes.some((pattern) => {
    return pattern.startsWith("!") && file.match(pattern.slice(1));
  });
};

/**
 * @type {import("lint-staged").Configuration}
 */
export default {
  "*.{css,js,ts,jsx,tsx,json}": (files) => {
    const args = [
      "--write",
      "--unsafe",
      "--no-errors-on-unmatched",
      "--files-ignore-unknown=true",
    ];
    const filtered = files.filter(isBiomeIncluded);
    return [`biome check ${args.join(" ")} ${filtered.join(" ")}`];
  },
  "package.json": "sort-package-json",
};
