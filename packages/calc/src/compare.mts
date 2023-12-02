import type { Int } from './int-str.mjs';
import type * as S from './string/compare.mjs';

export type Eq<T1 extends Int, T2 extends Int> = S.Eq<T1, T2>;

export type Ne<T1 extends Int, T2 extends Int> = S.Ne<T1, T2>;

export type Gt<T1 extends Int, T2 extends Int> = S.Gt<T1, T2>;

export type Ge<T1 extends Int, T2 extends Int> = S.Ge<T1, T2>;

export type Le<T1 extends Int, T2 extends Int> = S.Le<T1, T2>;

export type Lt<T1 extends Int, T2 extends Int> = S.Lt<T1, T2>;

export type Cmp<T1 extends Int, T2 extends Int> = S.Cmp<T1, T2>;

export type Max<T1 extends Int, T2 extends Int> = S.Max<T1, T2>;

export type Min<T1 extends Int, T2 extends Int> = S.Min<T1, T2>;
