TypeScript 有一个被称之为 「Freshness 」的概念，它也被称为更严格的对象字面量检查

- 每个对象字面量最初被认为是Freshness

- 类型断言或对象字面量类型变宽时，Freshness消失

- 对象字面量直接被分配时，出现不存在的类型会报错

```ts
function logName(something: { name: string }) {
  console.log(something.name);
}

logName({ name: 'matt' }); // ok
logName({ name: 'matt', job: 'being awesome' }); // Error: 对象字面量只能指定已知属性，`job` 属性在这里并不存在。
```

这种特性仅体现在对象字面量，使用中间变量赋值可以绕过

```ts
function logName(something: { name: string }) {
  console.log(something.name);
}

const obj = { name: 'matt', job: 'being awesome' };

logName({ name: 'matt' }); // ok
logName(obj); // ok
```

索引签名可以使对象字面量使用额外的属性

```ts
function logName(something: { name: string, [x: string]: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // ok
logName({ name: 'matt', job: 'being awesome' }); // ok
```