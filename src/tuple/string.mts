import type { Extends, Not } from '../base.mjs';
import type { Add, Dec, Sub } from '../calc/string/add-sub.mjs';
import type { Max, Min } from '../calc/string/compare.mjs';
import type { Digits } from '../calc/string/digits.mjs';
import type { Div2 } from '../calc/string/mul-div.mjs';
import type { AssertEq } from '../test-utils.mjs';

export type Length<A extends unknown[]> = `${A['length']}`;

export type Fill<T, N extends string> = Repeat<[T], N>;

export type Repeat<T extends unknown[], N extends string> = repeat.Impl0<T, N>;

namespace repeat {
  export type Impl0<T extends unknown[], N extends string> = N extends `${infer U}${Digits}`
    ? N extends `${U}${infer D extends Digits}`
      ? U extends ''
        ? Table<T>[D]
        : [...Impl0<Table<T>[10], U>, ...Table<T>[D]]
      : never
    : never;

  type Table<T extends unknown[]> = [
    [],
    T,
    [...T, ...T],
    [...T, ...T, ...T],
    [...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T],
    [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T],
  ];
}

export type IndexSequence<N extends string, S extends string = '0'> = indexsequence.Impl0<N, S>;

namespace indexsequence {
  export type Impl0<N extends string, S extends string> = Impl1<Fill<0, N>, S>;
  type Impl1<T, S extends string> = {
    [K in keyof T]: Add<Extract<K, string>, S>;
  };
}

export type ReverseSequence<N extends string, S extends string = '0'> = reversesequence.Impl0<N, S>;

namespace reversesequence {
  export type Impl0<N extends string, S extends string> = Impl1<Fill<0, N>, Add<Dec<N>, S>>;
  type Impl1<T extends unknown[], N extends string> = {
    [K in keyof T]: Sub<N, Extract<K, string>>;
  };
}

export type Reverse<T extends unknown[]> = {
  [K in keyof T]: T[Extract<ReverseSequence<Length<T>>[K], keyof T>];
};

/**
 * @template {unknown[]} A
 * Source tuple
 *
 * @template {string | undefined} S
 * Start index. If it is `undefined`, use `'0'` instead.
 * If it is `string`, use `A['length'] + S` instead.
 *
 * @template {string | undefined} E
 * End index. if it is `undefined`, use `A['length']` instead.
 * If it is `string`, use `A['length'] + S` instead.
 */
export type Slice<
  A extends unknown[],
  S extends string | undefined = undefined,
  E extends string | undefined = undefined,
> = slice.Impl0<A, S, E>;

namespace slice {
  export type Impl0<T extends unknown[], S extends string | undefined, E extends string | undefined> = Impl1<
    T,
    S,
    E,
    Length<T>
  >;

  type Impl1<T extends unknown[], S extends string | undefined, E extends string | undefined, L extends string> = Impl2<
    T,
    Min<S extends undefined ? '0' : S extends `-${string}` ? Add<S, L> : S, L>,
    Min<E extends undefined ? L : E extends `-${string}` ? Add<E, L> : E, L>
  >;

  export type Impl2<T extends unknown[], S extends string, E extends string> = Impl3<
    T,
    Extract<IndexSequence<Max<Sub<E, S>, '0'>, S>, string[]>
  >;

  export type Impl3<T extends unknown[], I extends string[]> = {
    [K in keyof I]: T[Extract<I[K], keyof T>];
  };
}

type Split<A extends unknown[], S extends string> = [Slice<A, '0', S>, Slice<A, S>];

export type Flatten<A extends unknown[][]> = A extends []
  ? []
  : A extends [infer T extends unknown[]]
    ? T
    : Split<A, Div2<Length<A>>> extends [infer A1 extends unknown[][], infer A2 extends unknown[][]]
      ? [...Flatten<A1>, ...Flatten<A2>]
      : never;

namespace _test {
  type _Test = [
    AssertEq<Fill<0, '15'>, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>,
    AssertEq<IndexSequence<'15'>, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']>,
    AssertEq<IndexSequence<'3', '4'>, ['4', '5', '6']>,
    AssertEq<ReverseSequence<'15'>, ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']>,
    AssertEq<ReverseSequence<'3', '8'>, ['10', '9', '8']>,
    AssertEq<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '1', '4'>, ['b', 'c', 'd']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '4', '1'>, []>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '-3', '-1'>, ['c', 'd']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '-3'>, ['c', 'd', 'e']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e']>, ['a', 'b', 'c', 'd', 'e']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], undefined, '3'>, ['a', 'b', 'c']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '1', '-1'>, ['b', 'c', 'd']>,
    AssertEq<Split<['a', 'b', 'c', 'd', 'e'], '3'>, [['a', 'b', 'c'], ['d', 'e']]>,
    AssertEq<Flatten<[['a'], [], [0, 1, 2], [[], [[]]]]>, ['a', 0, 1, 2, [], [[]]]>,
  ][number];
}
