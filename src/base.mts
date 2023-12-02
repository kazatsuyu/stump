import type { Inc } from './calc/add-sub.mjs';
import type { AssertEq } from './test-utils.mjs';

// A marker for under constructing.
/** @deprecated */
export type ToDo = never;

export type Normalize<T> = {
  [K in keyof T]: T[K];
};

export type Extends<T, U> = T extends U ? true : false;
export type Not<T extends boolean> = Extends<T, false>;

export type StrLen<T extends string> = T extends '' ? '0' : T extends `${string}${infer V}` ? Inc<StrLen<V>> : never;

export type ToString<T extends string | number | bigint | boolean | undefined | null> = `${T}`;
export type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never;
export type ToBigint<T extends string> = T extends `${infer U extends bigint}` ? U : never;

namespace _test {
  type _Test = [
    AssertEq<StrLen<'abcde'>, '5'>,
    AssertEq<ToString<10>, '10'>,
    AssertEq<ToNumber<'1.25e+100'>, 1.25e100>,
    AssertEq<ToBigint<'10'>, 10n>,
  ][number];
}
