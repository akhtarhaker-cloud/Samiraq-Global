export default [
  {
    ignores: [".next/**", "node_modules/**", ".pnpm-store/**"],
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      "no-debugger": "error",
    },
  },
];
