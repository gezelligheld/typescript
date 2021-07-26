namespace H {
    export type Location = number;
    export type Action = string;
}

interface PromptProps {
    message: string | ((location: H.Location, action: H.Action) => string | boolean);
    when?: boolean;
}

// 获取message的类型
/// 获取指定key的value的类型
type GetValueType<T, K> = K extends keyof T ? T[K] : never;
let a: GetValueType<PromptProps, 'message'>

// 获取message的第一个参数类型
/// 获取第一个函数参数类型
type Parameter<T extends (...args: any[]) => void> = T extends (arg: infer P, ...args: any[]) => void ? P : never;
/// message为联合类型。去掉string
type Exclude1<T, U> = T extends U ? never : T;
let b: Parameter<Exclude1<GetValueType<PromptProps, 'message'>, string>>;
