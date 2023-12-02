import type { Int } from './int-str.mjs';
import type * as S from './string/mul-div.mjs';

// TODO: カラツバ法とか実装したい
export type Mul<T1 extends Int, T2 extends Int> = Extract<S.Mul<T1, T2>, Int>;

export type Div<T1 extends Int, T2 extends Int> = Extract<S.Div<T1, T2>, Int>;

export type Div2<T extends Int> = Extract<S.Div2<T>, Int>;

export type Mod<T1 extends Int, T2 extends Int> = Extract<S.Mod<T1, T2>, Int>;
