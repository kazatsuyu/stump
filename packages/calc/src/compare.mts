import type { Int } from './int-str.mjs';
import type * as S from './string/compare.mjs';

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 === T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Eq<'42', '42'>, Eq<'42', '43'>, Eq<'0', '-0'>, Eq<'1', '-1'>];
 * //   ^?
 * //     type A = [true, false, true, false];
 * ```
 */
export type Eq<T1 extends Int, T2 extends Int> = S.Eq<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 !== T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Ne<'42', '42'>, Ne<'42', '43'>, Ne<'0', '-0'>, Ne<'1', '-1'>];
 * //   ^?
 * //     type A = [false, true, false, true];
 * ```
 */
export type Ne<T1 extends Int, T2 extends Int> = S.Ne<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 > T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Gt<'42', '42'>, Gt<'42', '43'>, Gt<'42', '41'>, Gt<'0', '-0'>, Gt<'1', '-1'>, Gt<'-1', '1'>];
 * //   ^?
 * //     type A = [false, false, true, false, true, false];
 * ```
 */
export type Gt<T1 extends Int, T2 extends Int> = S.Gt<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 >= T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Ge<'42', '42'>, Ge<'42', '43'>, Ge<'42', '41'>, Ge<'0', '-0'>, Ge<'1', '-1'>, Ge<'-1', '1'>];
 * //   ^?
 * //     type A = [true, false, true, true, true, false];
 * ```
 */
export type Ge<T1 extends Int, T2 extends Int> = S.Ge<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 <= T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Le<'42', '42'>, Le<'42', '43'>, Le<'42', '41'>, Le<'0', '-0'>, Le<'1', '-1'>, Le<'-1', '1'>];
 * //   ^?
 * //     type A = [true, true, false, true, false, true];
 * ```
 */
export type Le<T1 extends Int, T2 extends Int> = S.Le<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 < T2`, returns `true`. Otherwise returns `false`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Lt<'42', '42'>, Lt<'42', '43'>, Lt<'42', '41'>, Lt<'0', '-0'>, Lt<'1', '-1'>, Lt<'-1', '1'>];
 * //   ^?
 * //     type A = [false, true, false, false, false, true];
 * ```
 */
export type Lt<T1 extends Int, T2 extends Int> = S.Lt<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 > T2`, returns `1`.
 * Else if `T1 < T2` returns `-1`.
 * Otherwise returns `0`.
 * Note that `0 === -0`.
 *
 * @example
 * ```ts
 * type A = [Cmp<'42', '42'>, Cmp<'42', '43'>, Cmp<'42', '41'>, Cmp<'0', '-0'>, Cmp<'1', '-1'>, Cmp<'-1', '1'>];
 * //   ^?
 * //     type A = ['0', '-1', '1', '0', '1', '-1'];
 * ```
 */
export type Cmp<T1 extends Int, T2 extends Int> = S.Cmp<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 > T2`, returns `T1`. Otherwise returns `T2`.
 *
 * @example
 * ```ts
 * type A = [Max<'42', '42'>, Max<'42', '43'>, Max<'42', '41'>, Max<'0', '-0'>, Max<'1', '-1'>, Max<'-1', '1'>];
 * //   ^?
 * //     type A = ['42', '43', '42', '0', '1', '1'];
 * ```
 */
export type Max<T1 extends Int, T2 extends Int> = S.Max<T1, T2>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * If `T1 < T2`, returns `T1`. Otherwise returns `T2`.
 *
 * @example
 * ```ts
 * type A = [Min<'42', '42'>, Min<'42', '43'>, Min<'42', '41'>, Min<'0', '-0'>, Min<'1', '-1'>, Min<'-1', '1'>];
 * //   ^?
 * //     type A = ['42', '42', '41', '0', '-1', '-1'];
 * ```
 */
export type Min<T1 extends Int, T2 extends Int> = S.Min<T1, T2>;
