import type { Int, Minus, Plus } from './int-str.mjs';

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @description
 * If `T` is negative, returns `'-'`. Otherwise, returns `'+'`.
 *
 * @example
 * ```ts
 * type A = [Sign<'0'>, Sign<'1'>, Sign<'-0'>, Sign<'-1'>]
 * //   ^?
 * //     type A = ["+", "+", "-", "-"]
 * ```
 */
export type Sign<T extends Int> = T extends Minus ? '-' : '+';

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @description
 * If `T < 0` returns `-T`. Otherwise, returns `T`.
 *
 * @example
 * ```ts
 * type A = [Abs<'0'>, Abs<'1'>, Abs<'-0'>, Abs<'-1'>]
 * //   ^?
 * //     type A = ["0", "1", "0", "1"]
 * ```
 */
export type Abs<T extends Int> = T extends `-${infer U extends Plus}` ? U : Extract<T, Plus>;

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @description
 * `-T`.
 *
 * Note that `Inv<'0'>` is `'0'`.
 *
 * @example
 * ```ts
 * type A = [Inv<'0'>, Inv<'1'>, Inv<'-0'>, Inv<'-1'>]
 * //   ^?
 * //     type A = ["0", "-1", "0", "1"]
 * ```
 */
export type Inv<T extends Int> = T extends '0' ? '0' : T extends Minus ? Abs<T> : Extract<`-${T}`, Int>;
