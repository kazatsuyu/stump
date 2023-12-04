import { Int } from './int-str.mjs';
import * as S from './string/bit.mjs';

export type BitInv<T extends Int> = Extract<S.BitInv<T>, Int>;

export type RShift<T1 extends Int, T2 extends Int> = Extract<S.RShift<T1, T2>, Int>;

export type LShift<T1 extends Int, T2 extends Int> = Extract<S.LShift<T1, T2>, Int>;

export type BitAnd<T1 extends Int, T2 extends Int> = Extract<S.BitAnd<T1, T2>, Int>;

export type BitOr<T1 extends Int, T2 extends Int> = Extract<S.BitOr<T1, T2>, Int>;

export type BitXor<T1 extends Int, T2 extends Int> = Extract<S.BitXor<T1, T2>, Int>;
