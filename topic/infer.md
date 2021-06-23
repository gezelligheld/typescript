infer表示在泛型约束的条件语句中待推断的类型变量

```ts
// 如果 T 能赋值给 (...args: infer P) => any，则结果是 (...args: infer P) => any 类型中的参数 P，否则返回为 T
type ParamType<T> = T extends (...args: infer P) => any ? P : T;

// 使用
type User = {name: string, pwd: string};
type Func = (user: User) => void;
type Param = ParamType<Func>; // <User>[]
type Param1 = ParamType<number> // number
```

起到一个占位的作用，如果不使用infer，可能需要手动传入一个类型变量来实现，比较麻烦

```ts
type ParamType<T, P> = T extends (...args: P) => any ? P : T;
```