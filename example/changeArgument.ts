type Fn1 = (a: number, b: string) => [number]
type Result1 = ChangeArgument<Fn1> 
// 期望Result是 (b: string) => [number, string]
type Fn2 = () => [number]
type Result2 = ChangeArgument<Fn2> 
// 期望Result是 () => [number]

// 获取第一个函数参数类型
type FirstParam<T extends (...args: any[]) => void> = T extends () => void
    ? never
    : T extends (first: infer P, ...args: any[]) => void
        ? P
        : never;
type ChangeArgument<T extends (...args: any[]) => any[]> = T extends (first: any, ...args: infer P) => void
    ? (...args: P) => FirstParam<T> extends never ? ReturnType<T> : [...ReturnType<T>, FirstParam<T>]
    : T;