import { Inc } from './add-sub.mjs';

export type StrLen<T extends string> = T extends '' ? '0' : T extends `${string}${infer V}` ? Inc<StrLen<V>> : never;
