import type { Int, Plus } from './calc/int-str.mjs';
import type * as S from './tuple/string.mjs';

export type Length<A extends unknown[]> = Extract<S.Length<A>, Plus>;

export type Fill<T, N extends Plus> = S.Fill<T, N>;

export type Repeat<T extends unknown[], N extends Plus> = S.Repeat<T, N>;

export type IndexSequence<N extends Plus, S extends Int = '0'> = Extract<S.IndexSequence<N, S>, Plus[]>;

export type ReverseSequence<N extends Plus, S extends Int = '0'> = Extract<S.ReverseSequence<N, S>, Plus[]>;

export type Reverse<T extends unknown[]> = S.Reverse<T>;

/**
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
 */
export type Slice<
  A extends unknown[],
  S extends Int | undefined = undefined,
  E extends Int | undefined = undefined,
> = S.Slice<A, S, E>;

export type Flatten<A extends unknown[][]> = S.Flatten<A>;
