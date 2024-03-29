# typescript

##### 为什么使用 typescript

js 是弱类型语言，使用 typescript 可以强制类型，增加代码的可读性和可维护性，在编译阶段就可以避免一些错误

##### 基本类型

基本类型包括 boolean、string、number、object、数组、元组、void、any、unknown、never、null、undefined、函数等，以下是需要注意的点

- void & never：void 类型表示没有任何类型，如一个函数没有返回值；never 类型表示永远不存在的值的类型，如一个函数永远没有返回值或总抛出错误
- any & unknown：任何类型的值都能赋值给 any 和 unknown 类型，区别在于 any 会跳过静态检查，unknown 不会，但 unknown 使用时需要做类型检查或类型断言
- enum：默认是数字枚举，从 0 开始；字符串枚举不能反向映射

##### 类

- 成员：public 声明一个公有成员，不写默认为 public，既可以被继承也可以被实例使用；private 声明一个私有成员，即不能被继承也不能被实例使用；protected 声明一个受保护的成员，可以被继承但不能被实例使用
- 抽象类：abstract 可以声明一个抽象类，作为其他派生类的基类使用，不能直接被实例化。和接口相比，抽象类可以包含成员的实现细节，其方法必须在子类中实现

##### 接口

- 接口 interface 可以用来声明一个对象或函数的类型
- implements 关键字可以用接口约束类的 public 成员
- 接口之间通过 extends 可以继承，如果重复声明会自动合并
- 接口会继承类的 private 和 protected 成员

##### 泛型

- 使用泛型可以创建可重用的类型组件，包括接口、类、类型别名等
- extends 可以对类型变量进行泛型约束
- 类型变量可以通过高级类型进行类型的转换

##### 其他类型（条件类型、交叉类型、联合类型、类型别名 type、type 和 interface 区别、索引类型 keyof、映射类型 in）

- 条件类型可以简述为 T extends U ? X : Y，如果类型 T 是类型 U 的子集，那么取类型 X，否则取类型 Y。如果 T 是 A | B 这样的联合类型，则会自动分发为(A extends U ? X : Y) | (B extends U ? X : Y)，但如果联合类型中含有 never 会被忽略。特殊地，T extends never 永远不成立

  - infer 声明的类型变量表示待推断的类型，可以作为条件类型的结果
  - infer extends 可以用来约束 infer 声明的待推断的类型，还可以将 string 转为 number 活 boolean 类型

- type & interface

  - 都允许拓展，type 通过交叉类型，interface 通过 extends；interface 重复声明会合并
  - interface 实际上是创建了一个新的类型，而 type 只是别名
  - 适用场景不同，由于 interface 可合并在编写第三方库或组件时更适用，type 在进行类型计算、封装类型组件时较为适用

- 索引类型

  - keyof 取类型 T 的键的类型，T[K]在满足 K extends keyof T 的前提下可以取某个键对应的值的类型
  - as 操作符可以对键值类型作重映射

- 映射类型：in 可以迭代类型的键，从而去转换新的类型

##### 类型保护

经判断语句后自动收缩为窄类型；关键词 is 可以指定函数的某个参数固定是某一种类型（必须是已声明函数参数类型的子集）

##### 类型推断

ts 可以根据一些规则推断出变量类型，如定义变量、变量赋值、函数的 return 语句

##### 类型兼容

父类型更加宽泛，子类型更加具体，以此为基础判断一个类型对应的变量是否能够赋值给另外一个变量，即是否类型兼容，简言之如果 y 的类型是 x 的类型的子集，则 y 能赋值给 x，反过来说如果 x 赋值给了 y，y 是更具体的一方，可能存在 x 中没有的实现

- 协变：当类型 Y 是类型 X 的子集，复合类型 Comp\<Y\>也是类型 Comp\<X\>的子集，即类型 T 和复合类型 Comp\<T\>的类型兼容一致，称为协变，如对象、函数返回类型不同的函数、类的相互之间赋值，需要注意的是类只比较 pbulic 成员且 private、protected 成员需来源于同一个类
- 逆变：当类型 T 和复合类型 Comp\<T\>的类型兼容相反，称为逆变，如函数参数类型
- 双向协变：既协变又逆变称为双向协变，如一个满足函数参数类型逆变、函数返回值类型协变的函数
- 不变：既不协变又不逆变称为不变，如一个同时不满足函数参数类型逆变、函数返回值类型协变的函数

##### 编译流程

1. 检查器进行词法分析，将源码转化为 token
2. 解析器进行语法分析，将 token 转换为 AST
3. 绑定器进行作用域分析，将源码各部分连接成一个相关的类型系统，供检查器使用
4. 检查器进行类型检查，有错误就抛出
5. 如果类型检查通过，发射器将 AST 转换为 js 代码、d.ts 声明文件和 sourcemap

##### 类型声明

- lib.xx.d.ts：用来声明标准 api 的类型，如浏览器 api、js api，typescript 内置，可以配置 tsconfig.json 引入
- @types/xxx：用来声明没有使用 ts 编写的 js 包或没有标准化的 api 的类型，如 nodejs、其他第三方库，通过 npm 安装
- 自定义类型声明：利用 namespace、module、esm 模块化 ts 声明。在 esm 下，d.ts 文件中如果没有 import、export 语法，那所有的类型声明都是全局的，否则是模块内的。也可以使用 reference 引入类型声明从而保证模块是全局的

##### 类型体操

类型体操就是对类型变量的转换，通常可以借助以下方式

- 不确定数量时可以使用递归
- 借助条件类型中的 infer 推断类型
- 数组的 length 属性是一个字面量，可以用来计数
- 借助索引类型、映射类型、条件类型等对类型进行重新构造
- 联合类型进行条件类型操作时会自动分发
