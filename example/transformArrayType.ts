// ['1','2','3'] -> ['2','3']
type Tail<T extends any[]> = ((...args: T) => void) extends ((a: any, ...args: infer P) => void) ? P : never;
type T1 = Tail<['1','2','3']>;

// ['1','2','3'] -> '1'
type HeadArray<T extends any[]> = ((...args: T) => void) extends ((a: infer P, ...args: any[]) => void) ? P : never;
type T2 = HeadArray<['1','2','3']>;

// (['2','3'],'1') -> ['1','2','3']
type Flat<T extends any[], E> = ((...args: T) => void) extends ((...args: infer Q) => void) ? [E, ...Q] : never;
type T3 = Flat<['2','3'],'1'>;