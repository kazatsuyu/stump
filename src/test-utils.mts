import type { Extends, Normalize } from './base.mjs';

export type Assert<T extends true> = Extends<T, true>;
export type AssertNot<T extends false> = Extends<T, false>;
export type AssertEq<T extends Normalize<U>, U extends Normalize<T>> = Extends<[T, U], [Normalize<U>, Normalize<T>]>;

namespace _test {
  type _Test = [Assert<true>, AssertNot<false>, AssertEq<10, 10>][number];
}
