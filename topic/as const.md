TypeScript 默认推导出来的类型并不是字面量类型

```ts
const obj = { a: 1, b: 2 };
// {a: number, b: number}
type Obj = typeof obj;

const arr = [1, 2, 3];
// number[]
type Arr = typeof arr;
```

如果需要推导出字面量类型的，就需要用 as const，加上 as const 之后推导出来的类型是带有 readonly 修饰的

```ts
const obj = { a: 1, b: 2 } as const;
// { readonly a: 1, readonly b: 2 }
type Obj = typeof obj;

const arr = [1, 2, 3] as const;
// readonly [1,2,3]
type Arr = typeof arr;
```

加上 as const 的类型在类型编程时需要加上 readonly 标识，如反转一个加上 as const 的数组

```ts
type Reverse<T extends readonly unknown[]> = T extends readonly [
  arg1: infer First,
  arg2: infer Second
]
  ? [Second, First]
  : never;
const arr = [1, 2] as const;
// [2, 1]
type Res = Reverse<typeof arr>;
```
