import { Plus } from './int-str.mjs';
import * as S from './string/utils.mjs';

/**
 * @category Calc
 *
 * @template {string} S
 *
 * @description
 * returns length of `S`.
 *
 * Note that UTF-16 surrogate pair are counted as 2 characters.
 *
 * @example
 * ```ts
 * type A = [StrLen<''>, StrLen<'a'>, StrLen<'🪵'>]
 * //   ^?
 * //     type A = ["0", "1", "2"]
 * ```
 */
export type StrLen<S extends string> = Extract<S.StrLen<S>, Plus>;
