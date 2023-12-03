import type * as S from './string.mjs';
import type { Int, Plus } from '@stump/calc';

/**
 * @category Tuple
 *
 * @template {unknown[]} A
 *
 * @description
 * Count tuple length.
 *
 * @example
 * ```ts
 * type A = Length<[0, 0, 0]>;
 * //   ^?
 * //     type A = "3"
 * ```
 */
export type Length<A extends unknown[]> = Extract<S.Length<A>, Plus>;

/**
 * @category Tuple
 *
 * @template {unknown} T
 *
 * @template {Plus} N
 *
 * @description
 * Make `N` size tuple that elements are `T`.
 *
 * @example
 * ```ts
 * type A = Fill<0, "3">;
 * //   ^?
 * //     type A = [0, 0, 0]
 * ```
 */
export type Fill<T, N extends Plus> = S.Fill<T, N>;

/**
 * @category Tuple
 *
 * @template {unknown[]} T
 *
 * @template {Plus} N
 *
 * @description
 * Join `N` tuples `T`
 *
 * @example
 * ```ts
 * type A = Repeat<[0, 1], "3">;
 * //   ^?
 * //     type A = [0, 1, 0, 1, 0, 1]
 * ```
 */
export type Repeat<T extends unknown[], N extends Plus> = S.Repeat<T, N>;

/**
 * @category Tuple
 *
 * @template {Plus} N
 *
 * @template {Int} S
 *
 * @description
 * Create a tuple of length `N`, starting from `S` and increasing by 1.
 *
 * @example
 * ```ts
 * type A = IndexSequence<"3">;
 * //   ^?
 * //     type A = ["0", "1", "2"]
 *
 * type B = IndexSequence<"4", "5">;
 * //   ^?
 * //     type A = ["5", "6", "7", "8"]
 * ```
 */
export type IndexSequence<N extends Plus, S extends Int = '0'> = Extract<S.IndexSequence<N, S>, Plus[]>;

/**
 * @category Tuple
 *
 * @template {Plus} N
 *
 * @template {Int} S
 *
 * @description
 * Create a tuple of length `N`, decreasing by 1 and ending with `S`.
 *
 * @example
 * ```ts
 * type A = ReverseSequence<"3">;
 * //   ^?
 * //     type A = ["2", "1", "0"]
 *
 * type B = ReverseSequence<"4", "5">;
 * //   ^?
 * //     type A = ["8", "7", "6", "5"]
 * ```
 */
export type ReverseSequence<N extends Plus, S extends Int = '0'> = Extract<S.ReverseSequence<N, S>, Plus[]>;

/**
 * @category Tuple
 *
 * @template {unknown[]} T
 *
 * @description
 * Sort contents of tuple `T` in reverse order.
 *
 * @example
 * ```ts
 * type A = Reverse<['s', 't', 'r', 'e', 's', 's', 'e', 'd']>;
 * //   ^?
 * //     type A = ["d", "e", "s", "s", "e", "r", "t", "s"]
 * ```
 */
export type Reverse<T extends unknown[]> = S.Reverse<T>;

/**
 * @category Tuple
 *
 * @template {unknown[]} A
 * Source tuple
 *
 * @template {Int | undefined} S
 * Start index. If it is `undefined`, use `'0'` instead.
 * If it is `Minus`, use `A['length'] + S` instead.
 *
 * @template {Int | undefined} E
 * End index. if it is `undefined`, use `A['length']` instead.
 * If it is `Minus`, use `A['length'] + S` instead.
 *
 * @description
 * Cut out the tuple `A` from the `S`th to just before the `E`th.
 *
 * @example
 * ```ts
 * type A = Slice<['S', 'T', 'U', 'M', 'P'], '1', '4'>;
 * //   ^?
 * //     type A = ["T", "U", "M"]
 * ```
 */
export type Slice<
  A extends unknown[],
  S extends Int | undefined = undefined,
  E extends Int | undefined = undefined,
> = S.Slice<A, S, E>;

/**
 * @category Tuple
 *
 * @template {unknown[][]} A
 *
 * @description
 * Combines subtuples of tuple `A`.
 *
 * @example
 * ```ts
 * type A = Flatten<[['S'], ['T', 'U'], ['M'], [], ['P']]>;
 * //   ^?
 * //     type A = ["S", "T", "U", "M", "P"]
 * ```
 */
export type Flatten<A extends unknown[][]> = S.Flatten<A>;
