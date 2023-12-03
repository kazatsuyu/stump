import type { Digits } from '@stump/calc/src//string/digits.mjs';
import type { Add, Dec, Sub } from '@stump/calc/src/string/add-sub.mjs';
import type { Max, Min } from '@stump/calc/src/string/compare.mjs';
import type { Div2 } from '@stump/calc/src/string/mul-div.mjs';

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
