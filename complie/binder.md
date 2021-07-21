为了协助（检查器执行）类型检查，绑定器将源码的各部分连接成一个相关的类型系统，供检查器使用，绑定器的主要职责是创建符号

```
AST ~~ 绑定器 ~~> Symbols（符号）
```

符号将 AST 中的声明节点与其它声明连接到相同的实体上。符号是语义系统的基本构造块

```ts
function Symbol(flags: SymbolFlags, name: string) {
  this.flags = flags;
  this.name = name;
  this.declarations = undefined;
}
```

节点和符号间的链接由几个函数执行。其中一个用于绑定 SourceFile 节点到源文件符号（外部模块的情况下）的函数是 addDeclarationToSymbol

```ts
function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
  symbol.flags |= symbolFlags;

  // 创建 AST 节点到 symbol 的连接
  node.symbol = symbol;

  if (!symbol.declarations) {
    symbol.declarations = [];
  }
  // 将该节点添加为该符号的一个声明
  symbol.declarations.push(node);

  if (symbolFlags & SymbolFlags.HasExports && !symbol.exports) {
    symbol.exports = {};
  }

  if (symbolFlags & SymbolFlags.HasMembers && !symbol.members) {
    symbol.members = {};
  }

  if (symbolFlags & SymbolFlags.Value && !symbol.valueDeclaration) {
    symbol.valueDeclaration = node;
  }
}
```

AST 的节点可以被当作容器，这决定了节点及相关符号的 SymbolTables 的类别，会根据 getContainerFlags（一个语法类型和容器类型的映射） 的运行结果将节点设为 container 和（或） blockScopedContainer