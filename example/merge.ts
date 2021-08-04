// your code, 补全 merge 函数的类型
function merge<T extends keyof Person>(args: Pick<Person, T>){/*不需要实现 JS 逻辑*/}

type Person = {
  name: string;
  age: number;
}

merge({ name: 'name', age: 20 })
merge({ name: 'name' })

// error
// merge({ name: 'name', age: 20, sex: 'sex ' }) // 没有 sex 属性