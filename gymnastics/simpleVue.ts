// 获取computed中函数的返回值类型
type GetValuedType<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => void ? ReturnType<T[K]> : never
}

// ThisType 可以在对象字面量中键入 this，并提供通过上下文类型控制 this 类型
// 貌似需要tsconfig.json配置，这里无法生效
declare function SimpleVue<D, C, M>(options: {
  data: (this: void) => D,
  // computed中this的上下文是数据源data
  computed: C & ThisType<D>,
  // methods中的this的上下文是数据源、methods中的方法、computed中的属性
  // 需要注意的是，读取computed中的属性直接是this.fullname获取其方法的返回值（类似getter），所以需要GetValuedType处理一下
  methods: M & ThisType<D & M & GetValuedType<C>>,
}): any;

// 实现类似Vue的类型支持的简化版本
SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
  
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      },
    },
  
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
});