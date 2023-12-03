import type { Extends } from './base.mjs';

/**
 * @category Base
 *
 * @template {true} T
 *
 * @description
 * Check if `T` is `true`. If not, tsc error will be occured.
 *
 * @example
 * ```ts
 * type A = Assert<true>; // Ok
 * //   ^?
 * //     type A = true
 *
 * type B =
 *   // ^?
 *   //   type B = false
 *   Assert<false>;
 * //       ^^^^^ Error
 * ```
 */
export type Assert<T extends true> = Extends<T, true>;

/**
 * @category Base
 *
 * @template {false} T
 *
 * @description
 * Check if `T` is `false`. If not, tsc error will be occured.
 *
 * @example
 * ```ts
 * type A = AssertNot<false>; // Ok
 * //   ^?
 * //     type A = true
 *
 * type B =
 *   // ^?
 *   //   type B = false
 *   AssertNot<true>;
 * //          ^^^^^ Error
 * ```
 */
export type AssertNot<T extends false> = Extends<T, false>;

type Normalize<T> = {
  [K in keyof T]: T[K];
};

/**
 * @category Base
 *
 * @template {unknown} T
 *
 * @template {unknown} U
 *
 * @description
 * Check if `T === U`. If not, tsc error will be occured.
 *
 * @example
 * ```ts
 * type A = AssertEq<100, 100>; // Ok
 * //   ^?
 * //     type A = true
 *
 * type B =
 *   // ^?
 *   //   type B = false
 *   AssertEq<55, 100>;
 * //         ^^ Error
 * ```
 */
export type AssertEq<T extends Normalize<U>, U extends Normalize<T>> = Extends<[T, U], [Normalize<U>, Normalize<T>]>;
