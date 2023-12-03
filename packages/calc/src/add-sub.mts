import type { Int } from './int-str.mjs';
import type * as S from './string/add-sub.mjs';

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @description
 * Returns `T + 1`.
 *
 * @example
 * ```ts
 * type A = [Inc<'42'>, Inc<'9999'>, Inc<'139999'>, Inc<'0'>, Inc<'-1'>];
 * //   ^?
 * //     type A = ["43", "10000", "140000", "1", "0"];
 * ```
 */
export type Inc<T extends Int> = Extract<S.Inc<T>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T
 *
 * @description
 * Returns `T - 1`.
 *
 * @example
 * ```ts
 * type A = [Dec<'42'>, Dec<'10000'>, Dec<'140000'>, Dec<'1'>, Dec<'0'>];
 * //   ^?
 * //     type A = ["41", "9999", "139999", "0", "-1"];
 * ```
 */
export type Dec<T extends Int> = Extract<S.Dec<T>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * Returns `T1 + T2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //    type A = ["46", "100", "900112232", "123456865", "165", "135", "-135", "-165", "165", "-135", "135", "-165"]
 *   Add<'12', '34'>,
 *   Add<'36', '64'>,
 *   Add<'123456789', '776655443'>,
 *   Add<'76', '123456789'>,
 *   Add<'150', '15'>,
 *   Add<'150', '-15'>,
 *   Add<'-150', '15'>,
 *   Add<'-150', '-15'>,
 *   Add<'15', '150'>,
 *   Add<'15', '-150'>,
 *   Add<'-15', '150'>,
 *   Add<'-15', '-150'>,
 * ];
 * ```
 */
export type Add<T1 extends Int, T2 extends Int> = Extract<S.Add<T1, T2>, Int>;

/**
 * @category Calc
 *
 * @template {Int} T1
 *
 * @template {Int} T2
 *
 * @description
 * Returns `T1 - T2`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //    type A = ["34", "64", "776655443", "76", "135", "165", "-165", "-135", "-135", "165", "-165", "135"]
 *   Sub<'46', '12'>,
 *   Sub<'100', '36'>,
 *   Sub<'900112232', '123456789'>,
 *   Sub<'123456865', '123456789'>,
 *   Sub<'150', '15'>,
 *   Sub<'150', '-15'>,
 *   Sub<'-150', '15'>,
 *   Sub<'-150', '-15'>,
 *   Sub<'15', '150'>,
 *   Sub<'15', '-150'>,
 *   Sub<'-15', '150'>,
 *   Sub<'-15', '-150'>,
 * ];
 * ```
 */
export type Sub<T1 extends Int, T2 extends Int> = Extract<S.Sub<T1, T2>, Int>;
