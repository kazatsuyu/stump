import type { Add, Dec, Inc, Sub } from '@stump/calc/src/string/add-sub.mjs';
import type { Le, Max, Min } from '@stump/calc/src/string/compare.mjs';
import type { Digits } from '@stump/calc/src/string/digits.mjs';
import type { Div2 } from '@stump/calc/src/string/mul-div.mjs';

type TBase = readonly unknown[];

export type Length<T extends TBase> = `${T['length']}`;

export type DeconstructVariableTuple<T extends TBase> = deconstructVariadicTuple.Impl1<T>;

namespace deconstructVariadicTuple {
  export type Impl1<T extends TBase, A extends TBase = []> = T extends readonly [infer U, ...infer V]
    ? T extends readonly [U, ...V]
      ? Impl1<V, [...A, U]>
      : Impl2<T, A>
    : Impl2<T, A>;
  type Impl2<T extends TBase, A extends TBase, B extends TBase = []> = T extends readonly [...infer U, infer V]
    ? T extends readonly [...U, V]
      ? Impl2<U, A, [V, ...B]>
      : [A, U, B]
    : [A, T, B];
}

export type MinLength<T extends TBase> = number extends T['length']
  ? Add<Length<DeconstructVariableTuple<T>[0]>, Length<DeconstructVariableTuple<T>[2]>>
  : Length<T>;

export type At<T extends TBase, I extends string> = Normalize<at.Impl1<T, I>>;

type Normalize<T> = (T extends infer U ? [U] : [T])[0];

namespace at {
  export type Impl1<T extends TBase, I extends string> = I extends keyof T & `${number}`
    ? T[I]
    : number extends T['length']
      ? Impl2<DeconstructVariableTuple<T>, I>
      : I extends `-${infer I2}`
        ? Le<I2, Length<T>> extends true
          ? T[Extract<Sub<Length<T>, I2>, keyof T>]
          : undefined
        : undefined;
  type Impl2<T extends [TBase, TBase, TBase], I extends string> = Impl3<T[0], T[1], T[2], I>;
  type Impl3<A extends TBase, T extends TBase, B extends TBase, I extends string> = I extends `-${infer I2}`
    ? Dec<I2> extends keyof B & `${number}`
      ? At<B, I>
      : Impl5<A, T, Sub<I2, Length<B>>>
    : Impl4<T, B, Sub<I, Length<A>>>;
  type Impl4<T extends TBase, B extends TBase, I extends string> =
    | Slice<B, '0', Inc<I>>[number]
    | T[number]
    | (I extends keyof B & `${number}` ? never : undefined);
  type Impl5<A extends TBase, T extends TBase, I extends string> =
    | Slice<A, `-${I}`>[number]
    | T[number]
    | (Dec<I> extends keyof A & `${number}` ? never : undefined);
}

export type Fill<T, N extends string> = Repeat<[T], N>;

export type Repeat<T extends TBase, N extends string> = repeat.Impl0<T, N>;

namespace repeat {
  export type Impl0<T extends TBase, N extends string> = N extends `${infer U}${Digits}`
    ? N extends `${U}${infer D extends Digits}`
      ? U extends ''
        ? Table<T>[D]
        : [...Impl0<Table<T>[10], U>, ...Table<T>[D]]
      : never
    : never;

  type Table<T extends TBase> = [
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

export type Reverse<T extends TBase> = {
  [K in keyof T]: T[Extract<ReverseSequence<Length<T>>[K], keyof T>];
};

export type Slice<
  A extends TBase,
  S extends string | undefined = undefined,
  E extends string | undefined = undefined,
> = slice.Impl0<A, S, E>;

namespace slice {
  export type Impl0<T extends TBase, S extends string | undefined, E extends string | undefined> = Impl1<
    T,
    S,
    E,
    Length<T>
  >;

  type Impl1<T extends TBase, S extends string | undefined, E extends string | undefined, L extends string> = Impl2<
    T,
    Min<S extends undefined ? '0' : S extends `-${string}` ? Add<S, L> : S, L>,
    Min<E extends undefined ? L : E extends `-${string}` ? Add<E, L> : E, L>
  >;

  export type Impl2<T extends TBase, S extends string, E extends string> = Impl3<
    T,
    Extract<IndexSequence<Max<Sub<E, S>, '0'>, S>, string[]>
  >;

  export type Impl3<T extends TBase, I extends string[]> = {
    [K in keyof I]: T[Extract<I[K], keyof T>];
  };
}

type Split<A extends TBase, S extends string> = [Slice<A, '0', S>, Slice<A, S>];

type TTBase = readonly TBase[];

export type Flatten<T extends TTBase> = T extends [] | [TBase]
  ? T extends [infer T extends TBase]
    ? T
    : []
  : Split<T, Div2<Length<T>>> extends [infer T1 extends TTBase, infer T2 extends TTBase]
    ? [...Flatten<T1>, ...Flatten<T2>]
    : never;

export type Sum<T extends readonly string[]> = T extends [] | [string]
  ? T extends [infer T extends string]
    ? T
    : '0'
  : Split<T, Div2<Length<T>>> extends [infer T1 extends readonly string[], infer T2 extends readonly string[]]
    ? Add<Sum<T1>, Sum<T2>>
    : never;
