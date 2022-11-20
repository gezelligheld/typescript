// 'a=1' => {a: 1}
type ParseObj<Item extends string> = Item extends `${infer Key}=${infer Value}`
  ? { [key in Key]: Value }
  : never;

// 合并两个对象
type Merge<A extends Record<string, any>, B extends Record<string, any>> = {
  [Key in keyof A | keyof B]: Key extends keyof A
    ? A[Key]
    : Key extends keyof B
    ? B[Key]
    : never;
};

type ParseQueryString<Str extends string> =
  Str extends `${infer First}&${infer Rest}`
    ? Merge<ParseObj<First>, ParseQueryString<Rest>>
    : ParseObj<Str>;

// {a: 1, b: 2, c: 3}
type Res = ParseQueryString<'a=1&b=2&c=3'>;
