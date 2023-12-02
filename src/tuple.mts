import type { Extends, Not } from './base.mjs';
import type { Add, Dec, Sub } from './calc/add-sub.mjs';
import type { Max, Min } from './calc/compare.mjs';
import type { Digits, Int, Minus, Plus } from './calc/int-str.mjs';
import type { Div2 } from './calc/mul-div.mjs';
import type { Args, Call, Fn } from './fn.mjs';
import type { AssertEq } from './test-utils.mjs';

export type Length<A extends unknown[]> = Extract<`${A['length']}`, Plus>;

export type Fill<T, N extends Plus> = Repeat<[T], N>;

export type Repeat<T extends unknown[], N extends Plus> = repeat.Impl0<T, N>;

namespace repeat {
  export type Impl0<T extends unknown[], N extends Plus> = N extends `${infer U}${Digits}`
    ? N extends `${U}${infer D extends Digits}`
      ? U extends ''
        ? Table<T>[D]
        : [...Impl0<Table<T>[10], Extract<U, Plus>>, ...Table<T>[D]]
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

export type IndexSequence<N extends Plus, S extends Int = '0'> = indexsequence.Impl0<N, S>;

namespace indexsequence {
  export type Impl0<N extends Plus, S extends Int> = Impl1<Fill<0, N>, S>;
  type Impl1<T, S extends Int> = {
    [K in keyof T]: Add<Extract<K, Int>, S>;
  };
}

export type ReverseSequence<N extends Plus, S extends Int = '0'> = reversesequence.Impl0<N, S>;

namespace reversesequence {
  export type Impl0<N extends Plus, S extends Int> = Impl1<Fill<0, N>, Add<Dec<N>, S>>;
  type Impl1<T extends unknown[], N extends Int> = {
    [K in keyof T]: Sub<N, Extract<K, Int>>;
  };
}

export type Reverse<T extends unknown[]> = {
  [K in keyof T]: T[Extract<ReverseSequence<Length<T>>[K], keyof T>];
};

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
> = slice.Impl0<A, S, E>;

namespace slice {
  export type Impl0<T extends unknown[], S extends Int | undefined, E extends Int | undefined> = Impl1<
    T,
    S,
    E,
    Length<T>
  >;

  type Impl1<T extends unknown[], S extends Int | undefined, E extends Int | undefined, L extends Plus> = Impl2<
    T,
    Min<S extends undefined ? '0' : S extends Minus ? Add<S, L> : Extract<S, Plus>, L>,
    Min<E extends undefined ? L : E extends Minus ? Add<E, L> : Extract<E, Plus>, L>
  >;

  export type Impl2<T extends unknown[], S extends Plus, E extends Plus> = Impl3<
    T,
    Extract<IndexSequence<Max<Sub<E, S>, '0'>, S>, Plus[]>
  >;

  export type Impl3<T extends unknown[], I extends Plus[]> = {
    [K in keyof I]: T[Extract<I[K], keyof T>];
  };
}

type Split<A extends unknown[], S extends Int> = [Slice<A, '0', S>, Slice<A, S>];

export type Map<A extends Fn['args'][], F extends Fn> = {
  [K in keyof A]: Call<F, A[K]>;
};

export type FoldL<A extends F['args'][1][], F extends Fn<[unknown, unknown]>, I extends F['args'][0]> = A extends []
  ? I
  : A extends [infer T, ...infer A1]
    ? FoldL<A1, F, Call<F, [I, T]>>
    : never;

export type FoldR<A extends F['args'][1][], F extends Fn<[unknown, unknown]>, I extends F['args'][0]> = A extends []
  ? I
  : A extends [...infer A1, infer T]
    ? FoldR<A1, F, Call<F, [I, T]>>
    : never;

interface FilterFn<F extends Fn<unknown, boolean>> extends Fn<[F['args'][], F['args']], F['args'][]> {
  return: Call<F, Args<this, FilterFn<F>>[1]> extends true
    ? [...Args<this, FilterFn<F>>[0], Args<this, FilterFn<F>>[1]]
    : Args<this, FilterFn<F>>[0];
}

export type Filter<A extends F['args'][], F extends Fn<unknown, boolean>> = FoldL<A, FilterFn<F>, []>;

export type Flatten<A extends unknown[][]> = A extends []
  ? []
  : A extends [infer T extends unknown[]]
    ? T
    : Split<A, Div2<Length<A>>> extends [infer A1 extends unknown[][], infer A2 extends unknown[][]]
      ? [...Flatten<A1>, ...Flatten<A2>]
      : never;

namespace _test {
  interface TestFn extends Fn<string, string> {
    return: `${Args<this, TestFn>}${Args<this, TestFn>}`;
  }

  interface ConcatFn extends Fn<[string, string], string> {
    return: `${Args<this, ConcatFn>[0]}${Args<this, ConcatFn>[1]}`;
  }

  interface Not3 extends Fn<Int, boolean> {
    return: Not<Extends<Args<this, Not3>, '3'>>;
  }

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
    AssertEq<Map<['abc', 'def'], TestFn>, ['abcabc', 'defdef']>,
    AssertEq<FoldL<['a', 'b', 'c', 'd'], ConcatFn, 'o'>, 'oabcd'>,
    AssertEq<FoldR<['a', 'b', 'c', 'd'], ConcatFn, 'o'>, 'odcba'>,
    AssertEq<Filter<['1', '2', '3', '4', '3', '2', '1'], Not3>, ['1', '2', '4', '2', '1']>,
    AssertEq<Flatten<[['a'], [], [0, 1, 2], [[], [[]]]]>, ['a', 0, 1, 2, [], [[]]]>,
  ][number];
}
