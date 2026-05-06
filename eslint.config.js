import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [["@babel/preset-react", { runtime: "automatic", importSource: "solid-js" }]],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^[A-Z]" }],
      "no-console": "warn",
    },
  },

  // Max lines rule scoped to SCSS files under src folder only
  {
    files: ["src/**/*.scss"],
    rules: {
      "max-lines": [
        "error",
        {
          max: 200,
          skipBlankLines: true, // blank lines won't count
          skipComments: true,   // comment-only lines won't count
        },
      ],
    },
  },
];