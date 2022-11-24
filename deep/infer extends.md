typescript 4.7 引入了新语法 infer extends，用来约束 infer 声明的待推断类型的类型

为什么引入呢？infer 存在这样一个问题，推导出的类型是 unknown，导致这里报错，不能直接当作 string 使用

```js
type TextLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last] ? `最后一个是${Last}` : never;
```

改进如下

```js
// 取交叉类型
type TextLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last] ? `最后一个是${Last & string}` : never;
// 或加一层条件类型判断
type TextLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? Last extends string
    ? `最后一个是${Last}`
    : never
  : never;

```

有了 infer extends 后就可以这样写

```ts
type TextLast<Arr extends string[]> = Arr extends [
  ...infer Rest,
  infer Last extends string
]
  ? `最后一个是${Last}`
  : never;
```

此外 infer extends 可以直接推导出字面量类型，可以将 string 转为 number、boolean

```ts
type StrToBoolean<Str extends string> =
  Str extends `${infer Result extends boolean}` ? Result : never;
// true
type Res = StrToBoolean<'true'>;
```
