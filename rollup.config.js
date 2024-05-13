import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { globSync } from "glob";
import { relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

// 提取重复的typescript插件配置
const getTypescriptPluginConfig = () => ({
  compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
  exclude: "node_modules/**",
});
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
        entryFileNames: `[name].js`,
      },
    ],
    plugins: [typescript(getTypescriptPluginConfig()), terser()],
    external: ["qiniu-js"],
  },
  {
    input: "src/index.ts",
    output: {
      name: "yanUtils",
      file: "lib/index.js",
      format: "umd",
      globals: {
        "qiniu-js": "qiniu",
      },
    },
    plugins: [typescript(getTypescriptPluginConfig()), terser()],
    external: ["qiniu-js"],
  },
];
