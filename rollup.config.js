import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    name: "yanutils",
    file: "index.js",
    format: "umd",
  },
  plugins: [
    typescript({
      compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
      exclude: "node_modules/**",
    }),
    terser(),
  ],
  external: ["qiniu-js"],
};
