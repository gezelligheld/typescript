// 链式调用
const a: YourTypeFunc = null;
const result = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

// result 
type res = typeof result 
// 期望res的类型和Expected相似
type Expected = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type YourTypeFunc = {
    option: (val1: string, val2: string | {value: string} | number) => YourTypeFunc,
    get: () => Expected;
};