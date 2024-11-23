import pkg from "@eslint/js";

export default [
  {
    ...pkg.configs.recommended,
    files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue'], // 指定要检查的文件模式
    ignores: ["dist/*", "dev/*"],
  }
];
