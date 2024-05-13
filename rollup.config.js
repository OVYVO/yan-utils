import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "modules/index.ts",
  output: {
    name: "cliUtils",
    file: "index.js",
    format: "umd",
    globals: {
      chalk: "chalk",
      ora: "ora",
      "fs-extra": "fs$1",
    },
  },
  plugins: [
    typescript({
      compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
      exclude: "node_modules/**",
    }),
    terser(),
  ],
  external: ["chalk", "ora", "fs-extra"],
};
