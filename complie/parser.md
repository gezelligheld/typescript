在ts内部，由解析器(parser)控制扫描器将源码转化为抽象语法树

```
Token 流 ~~ 解析器 ~~> AST（抽象语法树）
```

在内部，parseSourceFile 函数准备好解析器的状态，调用 initializeState函数 准备好扫描器的状态，然后使用 parseSourceFileWorker函数 继续解析源代码

parseSourceFileWorker函数先创建一个 SourceFile AST 节点，然后从 parseStatements 函数开始解析源代码，parseStatements根据扫描器返回的当前 token 来切换，如前 token 是一个 SemicolonToken（分号标记），就会调用 paserEmptyStatement 为空语句创建一个 AST 节点

```ts
function parseEmptyStatement(): Statement {
  // 创建节点，传入参数为语法类别
  let node = <Statement>createNode(SyntaxKind.EmptyStatement);
  // 会检查解析器状态中的当前 token 是否与指定的语法类别匹配
  parseExpected(SyntaxKind.SemicolonToken);
  // 设置节点的 end 位置，并添加一些有用的信息，例如上下文标志
  return finishNode(node);
}
```