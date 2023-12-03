import type { Int } from './int-str.mjs';
import type * as S from './string/mul-div.mjs';

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * Returns `T1 * T2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //   type A = ["408", "121932631112635269", "420000000000", "1000000002", "0", "2250", "-2250", "-2250", "2250"]
 *   Mul<'12', '34'>,
 *   Mul<'123456789', '987654321'>,
 *   Mul<'420', '1000000000'>,
 *   Mul<'333333334', '3'>,
 *   Mul<'123456789', '0'>,
 *   Mul<'15', '150'>,
 *   Mul<'15', '-150'>,
 *   Mul<'-15', '150'>,
 *   Mul<'-15', '-150'>,
 * ];
 * ```
 */
export type Mul<T1 extends Int, T2 extends Int> = Extract<S.Mul<T1, T2>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * Returns `T1 / T2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //   type A = ["2", "8", "420", "111111111", never, "0", "10", "-10", "-10", "10"]
 *   Div<'34', '12'>,
 *   Div<'987654321', '123456789'>,
 *   Div<'420000000000', '1000000000'>,
 *   Div<'333333334', '3'>,
 *   Div<'123456789', '0'>,
 *   Div<'100', '101'>,
 *   Div<'150', '15'>,
 *   Div<'150', '-15'>,
 *   Div<'-150', '15'>,
 *   Div<'-150', '-15'>,
 * ];
 * ```
 */
export type Div<T1 extends Int, T2 extends Int> = Extract<S.Div<T1, T2>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @template {Int} T
 *
 * @description
 * Returns `T1 / 2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //   type A = ["17", "", "1024", "-1024"]
 *   Div2<'34'>,
 *   Div2<'493827160'>,
 *   Div2<'2048'>,
 *   Div2<'-2048'>,
 * ];
 */
export type Div2<T extends Int> = Extract<S.Div2<T>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * Returns `T1 % T2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //   type A = ["10", "9", "0", "1", never, "100", "6", "6", "-6", "-6"]
 *   Mod<'34', '12'>,
 *   Mod<'987654321', '123456789'>,
 *   Mod<'420000000000', '1000000000'>,
 *   Mod<'333333334', '3'>,
 *   Mod<'123456789', '0'>,
 *   Mod<'100', '101'>,
 *   Mod<'150', '16'>,
 *   Mod<'150', '-16'>,
 *   Mod<'-150', '16'>,
 *   Mod<'-150', '-16'>,
 * ];
 * ```
 */
export type Mod<T1 extends Int, T2 extends Int> = Extract<S.Mod<T1, T2>, Int>;
