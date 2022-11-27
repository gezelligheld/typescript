TypeScript 的强制类型给代码增加了健壮性，但也多了个编译的过程，如果项目过大，那编译就比较慢，TypeScript 3.0 的时候实现了 Project Reference 的特性，就是用于优化编译和类型检查的性能的

假设项目下有两个相对独立而且比较大的模块，它们都用 ts 编写，使用同一个 tsconfig.json 来配置编译方式，执行 tsc 就会把 ts 编译为 js。由于它们相对独立，当其中一个模块变更时，另一个模块也会重新编译，这就没有必要了，我们期望独立的模块可以缓存，不要跟随着变更的模块一起编译，这就是 Project Reference 的功能配置过程如下

1. 在各个模块下添加 tsconfig.json 配置

```json
{
  "compilerOptions": {
    // Project Reference所需要的
    "composite": true,
    "lib": ["ES2015", "DOM"]
  }
  // ...
}
```

2. 在项目根目录的 tsconfig.json 里加上一个 references 的配置，并引入相关模块

```json
{
  "compilerOptions": {
    "lib": ["ES2015", "DOM"]
  },
  // prepend 指定编译顺序
  "references": [
    { "path": "./src/aaa", "prepend": true },
    { "path": "./src/aaa" }
  ]
  // ...
}
```

3. 这样再执行 tsc --build 进行编译，你会发现编译结果多了 .d.ts 的声明，还多了 tsconfig.tsbuildinfo 的文件，它记录了已经编译了的文件的 hash，当编译的时候会对比 hash，如果没有变化就会跳过编译
