import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { globSync } from "glob";
import { relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

// 获取所有入口文件
const getEntries = () => {
  try {
    const files = globSync("src/*.ts", { ignore: "src/index.ts" });
    if (!files.length) {
      throw new Error("未找到入口文件");
    }
    return Object.fromEntries(
      files.map((file) => [
        relative("src", file.slice(0, file.length - extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
// 获取打包插件
const getPlugins = () => [
  resolve({ preferBuiltins: false, exclude: "node_modules" }),
  commonjs({ exclude: "node_modules" }),
  typescript({ exclude: "node_modules" }),
  terser(),
];

const entries = getEntries();

export default [
  {
    input: entries,
    output: [
      {
        dir: "lib/es",
        format: "es",
        entryFileNames: `[name].js`,
      },
      {
        dir: "lib/cjs",
        format: "cjs",
        entryFileNames: `[name].cjs`,
      },
    ],
    plugins: getPlugins(),
    external: ["qiniu-js"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.js",
      format: "es",
    },
    plugins: getPlugins(),
    context: "window",
  },
];
