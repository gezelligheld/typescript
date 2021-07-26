// 题目
interface Action<T> {
    payload?: T;
    type: string;
}

class EffectModule {
    count = 1;

    message = 'hello!';

    delay = (input: Promise<number>) => {
        return input.then(i => ({
            payload: `hello ${i}!`,
            type: 'delay',
        }));
    };

    setMessage = (action: Action<Date>) => {
        return {
            payload: action.payload!.getMilliseconds(),
            type: 'set-message',
        };
    };
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => any;

// 接受 EffectModule 实例，将它变成另一个对象，这个对象上只有EffectModule 的同名方法，但是方法的类型签名被改变了
const connect: Connect = m => ({
    delay: (input: number) => ({
        type: 'delay',
        payload: 'hello 2',
    }),
    setMessage: (input: Date) => ({
        type: 'set-message',
        payload: input.getMilliseconds(),
    }),
});

export const connected = connect(new EffectModule());

/********** 解答 **********/

// 问题简化
/*
> 异步方法类型前后变化
type Previous = (input: Promise<number>) => Promise<Action<string>>>
type Next = (input:number) => Promise<string>>
抽象一下
type Previous<T, U> = (input: Promise<T>) => Promise<Action<U>>>
type Next<T, U> = (input: T) => Promise<U>>
 
> 同步方法类型前后变化
type Previous = (input: Action<Date>) => Action<number>
type Next = (input: Date) => number
抽象一下
type Previous<T, U> = (input: Action<T>) => Action<U>
type Next<T, U> = (input: T) => U
*/

// 所期望的目标Connect类型
/*
type Connect = {
  [K in FunctionKey<EffectModule>]: Convert<EffectModule[K]>
};
抽象一下
type Connect<M> = {
  [K in FunctionKey<M>]: Convert<M[K]>
};
*/

// 获取value是函数的key
type FunctionKey<T> = {
    [K in keyof T]: T[K] extends Func ? K : never
}[keyof T];

// 期望的Convert类型长这样，然后分别转换函数参数和返回值的类型
type Convert<T extends Func> = (args: ConvertArg<T>) => ConvertResult<T>;

// 转换函数参数类型
type Func = (...args: any) => void;
/// 获取函数参数类型
type Param<T extends (...args: any) => void> = T extends (...args: infer P) => void ? P : never;
/// 获取第一个函数参数类型
type FirstParam<T extends Func> = Param<T> extends [infer P, ...any[]] ? P : never;
/// 根据不同种类的方法(同步/异步)获取其函数参数类型
type ConvertArg<T extends Func> = FirstParam<T> extends Promise<infer P>
    ? P
    : FirstParam<T> extends Action<infer Q>
        ? Q
        : FirstParam<T>;

// 转换函数返回值类型
/// 获取返回值类型
type ReturnType<T extends Func> = T extends (args: any) => infer P ? P : never;
type ConvertResult<T extends Func> = ReturnType<T> extends Promise<infer P>
    ? P
    : ReturnType<T>;

type Connect1<M> = {
    [K in FunctionKey<M>]: Convert<M[K]>
};

// 将connect函数修改为以下即可
/*
const connect = <M>(m: M): Connect1<M> => ({
    delay: (input: number) => ({
        type: 'delay',
        payload: 'hello 2',
    }),
    setMessage: (input: Date) => ({
        type: 'set-message',
        payload: input.getMilliseconds(),
    }),
} as any);
*/