import type { Int } from './int-str.mjs';
import type * as S from './string/add-sub.mjs';

export type Inc<T extends Int> = Extract<S.Inc<T>, Int>;

export type Dec<T extends Int> = Extract<S.Dec<T>, Int>;

export type Add<T1 extends Int, T2 extends Int> = Extract<S.Add<T1, T2>, Int>;

export type Sub<T1 extends Int, T2 extends Int> = Extract<S.Sub<T1, T2>, Int>;
