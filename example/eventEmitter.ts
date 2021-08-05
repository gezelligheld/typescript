class EventEmitter<T extends Record<string, any[]>> {
    private map = new Map<keyof T, (...args: any) => void>();
    on = <M extends keyof T>(name: M, fn: (...data: T[M]) => void) => {
        this.map.set(name, fn);
    };
    emit = <M extends keyof T>(name: M, ...args: T[M]) => {
        const fn = this.map.get(name);
        return fn && fn(...args);
    }
}

// 实现一个 EventEmitter 类
const eventEmitter = new EventEmitter<{
    // 传入一个key为事件名称、value为参数个数及类型的类型变量
    sayHello: [string],
    sayAge: [number],
}>();

eventEmitter.on('sayHello', (name: string) => {
  console.log(name);
})

eventEmitter.on('sayAge', (age: number) => {
  console.log(age);
})

eventEmitter.emit('sayHello', 'test') // expect success
eventEmitter.emit('hello', 'test') // expect error, 函数名没有被注册
eventEmitter.emit('sayHello', 123) // expect error, sayHello 的参数类型为 string 
eventEmitter.emit('sayHello', 'test', '124') // expect error, sayHello 的参数数量为1