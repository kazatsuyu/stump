import type { Int, Minus, Plus } from './int-str.mjs';

export type Sign<T extends Int> = T extends Minus ? '-' : '+';

export type Abs<T extends Int> = T extends `-${infer U extends Plus}` ? U : Extract<T, Plus>;

export type Inv<T extends Int> = T extends '0' ? '0' : T extends Minus ? Abs<T> : Extract<`-${T}`, Int>;
