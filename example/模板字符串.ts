type camelCase1 = Underscore<'hello_world_with_types'> // expected to be 'helloWorldWithTypes' 

// 递归+模板字符串
// Capitalize可以让字符串首字母大写，改变了值，用到了关键字intrinsic
// intrinsic关键字专门针对字符串类型<字符串字面量、模板字符串>而提供的，生成的类型涉及到了值的转换，而不是类型的转换，而这在TS里通过已有的类型书写方式是无法表达、也不太适合去表达的。所以 TS 只能以内置关键字 instrinsic 来通过编译期来实现
type Underscore<T extends string> = T extends `${infer M}_${infer N}`
    ? `${M}${Underscore<Capitalize<N>>}`
    : T;