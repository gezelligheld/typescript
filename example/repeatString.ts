// 取字符串的首字母类型
type HeadString<T extends string> = T extends `${infer P}${infer Q}` ? P : never;

type StringToTuple<T extends string, F extends string[] = []> = T extends `${infer P}${infer Q}`
    // Q为空时说明遍历到头了
    ? '' extends Q
        ? [...F, P]
        : StringToTuple<Q, [...F, P]>
    : never;

/*
* 第一次执行Repeat，T='a'，StringToTuple递归，递归结果['a']，length=1，不满足条件extends 3，继续递归Repeat
* 第二次执行Repeat，T='aa'，StringToTuple递归，递归结果['a', 'a']，length=2，不满足条件extends 3，继续递归Repeat
* 第三次执行Repeat，T='aaa'，StringToTuple递归，递归结果['a', 'a', 'a']，length=3，满足条件extends 3，返回结果T
*/
type Repeat<T extends string, N extends number> = N extends 0
    ? ''
    : StringToTuple<T>['length'] extends N
        ? T
        : Repeat<`${T}${HeadString<T>}`, N>;

type RepeatTest = Repeat<"a", 3>; // 'aaa'