import type * as S from './string/digits.mjs';
import type { Extends, Assert } from '@stump/base';

/**
 * @category Calc
 *
 * @description
 * Union of `'0'` to `'9'`
 */
export type Digits = S.Digits;

/**
 * @ignore
 *
 * @description
 * Union of `'0'` to `'8'`
 */
export type DigitsWithout9 = S.DigitsWithout9;

/**
 * @ignore
 *
 * @description
 * Union of `'1'` to `'9'`
 */
export type DigitsWithout0 = S.DigitsWithout0;

/**
 * @category Calc
 *
 * @description
 * Integer-like string.
 *
 * @example
 * ```ts
 * const a: Int = '100'; // OK
 * const b: Int = '-100'; // OK
 * const c: Int = '00';
 * //    ^ Error
 * ```
 */
export type Int = `${bigint}`;

/**
 * @category Calc
 *
 * @description
 * Positive integer-like string.
 *
 * @example
 * ```ts
 * const a: Plus = '100'; // OK
 * const b: Plus = '-100';
 * //    ^ Error
 * const c: Plus = '00';
 * //    ^ Error
 * ```
 */
export type Plus = Int & (Digits | `${DigitsWithout0}${string}`);

/**
 * @category Calc
 *
 * @description
 * Negative integer-like string.
 *
 * @example
 * ```ts
 * const a: Minus = '100';
 * //    ^ Error
 * const b: Minus = '-100'; // OK
 * const c: Minus = '00';
 * //    ^ Error
 * ```
 */
export type Minus = Int & `-${string}`;

/**
 * @category Calc
 *
 * @description
 * TODO
 */
export type IntLike = Int | number | bigint;

/**
 * @category Calc
 *
 * @description
 * TODO
 */
export type ToInt<N extends IntLike> = Extract<`${N}`, Int>;

namespace _test {
  type _Test = [
    Assert<Extends<Plus, Int>>,
    Assert<Extends<Minus, Int>>,
    Assert<Extends<'0', Plus>>,
    Assert<Extends<'1', Plus>>,
    Assert<Extends<'10', Plus>>,
    Assert<Extends<'100', Plus>>,
    Assert<Extends<'314', Plus>>,
    Assert<Extends<'-0', Minus>>,
    Assert<Extends<'-1', Minus>>,
    Assert<Extends<'-10', Minus>>,
    Assert<Extends<'-100', Minus>>,
    Assert<Extends<'-314', Minus>>,
  ][number];
}
