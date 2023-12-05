import type { Add, Dec, Inc, Sub } from '@stump/calc/src/string/add-sub.mjs';
import type { Ge, Le, Max, Min } from '@stump/calc/src/string/compare.mjs';
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

declare const Last: unique symbol;
export type Last = typeof Last;

export type Position = string | Last;

export type Slice<A extends TBase, S extends Position = '0', E extends Position = Last> = slice.Impl0<A, S, E>;

namespace slice {
  export type Impl0<
    T extends TBase,
    S extends Position,
    E extends Position,
    S1 extends string = PositionToString<S>,
    E1 extends string = PositionToString<E>,
  > = number extends T['length']
    ? T extends infer T extends TBase
      ? Impl4<DeconstructVariableTuple<T>, S1, E1>
      : never
    : Impl3<T, S1, E1>;

  type PositionToString<P extends Position> = P extends string ? (P extends '-0' ? '0' : P) : '-0';

  type Impl2<T extends TBase, S extends string, E extends string> = Extract<Impl3<T, S, E>, TBase>;

  type Impl3<
    T extends TBase,
    S extends string,
    E extends string,
    L extends string = Length<T>,
    S1 extends string = Limit<S, L>,
    E1 extends string = Limit<E, L>,
    I = IndexSequence<Max<Sub<E1, S1>, '0'>, S1>,
  > = {
    [K in keyof I]: T[Extract<I[K], keyof T>];
  };

  type Limit<P extends string, L extends string> = P extends `-${string}` ? Max<Add<P, L>, '0'> : Min<P, L>;

  type Impl4<T extends [TBase, TBase, TBase], S extends string, E extends string> = Impl5<T[0], T[1], T[2], S, E>;

  type Impl5<
    A extends TBase,
    T extends TBase,
    B extends TBase,
    S extends string,
    E extends string,
  > = S extends `-${infer S extends string}`
    ? E extends `-${infer E extends string}`
      ? Impl6<A, T, B, S, E>
      : Impl7<A, T, B, S, E>
    : E extends `-${infer E extends string}`
      ? Impl8<A, T, B, S, E>
      : Impl9<A, T, B, S, E>;

  type Impl6<
    A extends TBase,
    T extends TBase,
    B extends TBase,
    S extends string,
    E extends string,
    LB extends string = Length<B>,
    B1 extends TBase = Impl2<B, '0', `-${E}`>,
    E1 extends string = Max<'0', Sub<E, LB>>,
    S1 extends string = Max<'0', Sub<S, Sub<E, E1>>>,
    S2 extends string = Max<'0', Sub<S, LB>>,
  > = [Dec<S1>, Ge<E1, S1>] extends { 0: keyof B1 } | { 1: true }
    ? Impl3<B1, `-${S1}`, `-${E1}`>
    : [...(T | Impl3<A, `-${S2}`, '-0'>)[number][], ...Impl2<B1, `-${S1}`, `-${E1}`>];

  type Impl7<
    A extends TBase,
    T extends TBase,
    B extends TBase,
    S extends string,
    E extends string,
    LA extends string = Length<A>,
    LB extends string = Length<B>,
    T1 extends string = Add<S, E>,
    T2 extends string = Add<LA, LB>,
  > = [S, E] extends { 0: keyof B | LB } | { 1: keyof A | LA }
    ? [S, E, Le<T1, T2>] extends { 0: '0' } | { 1: '0' } | { 2: true } | never
      ? []
      : (Impl3<A, Max<'0', Sub<Add<LA, LB>, S>>, E> | Impl3<B, `-${S}`, Max<'0', Sub<E, LA>>>)[number][]
    : (Impl3<A, Max<'0', Sub<Add<LA, LB>, S>>, E> | T | Impl3<B, `-${S}`, Max<'0', Sub<E, LA>>>)[number][];

  type Impl8<
    A extends TBase,
    T extends TBase,
    B extends TBase,
    S extends string,
    E extends string,
    LA extends string = Length<A>,
    LB extends string = Length<B>,
    A1 extends TBase = Impl2<A, S, '-0'>,
    B1 extends TBase = Impl2<B, '0', `-${E}`>,
    S1 extends string = Max<'0', Sub<S, LA>>,
    E1 extends string = Max<'0', Sub<E, LB>>,
  > = [
    ...Impl2<A1, '0', `-${E1}`>,
    ...(T | Impl3<A1, `-${E1}`, '-0'> | Impl3<B1, `0`, S1>)[number][],
    ...Impl2<B1, S1, '-0'>,
  ];

  type Impl9<
    A extends TBase,
    T extends TBase,
    B extends TBase,
    S extends string,
    E extends string,
    LA extends string = Length<A>,
    A1 extends TBase = Impl2<A, S, '-0'>,
    S1 extends string = Max<'0', Sub<S, LA>>,
    E1 extends string = Max<'0', Sub<E, Sub<S, S1>>>,
    LA1 extends string = Length<A1>,
    E2 extends string = Max<'0', Sub<E1, LA1>>,
  > = [E1, Ge<S1, E1>] extends { 0: keyof A1 | LA1 } | { 1: true }
    ? Impl3<A1, S1, E1>
    : [...Impl2<A1, S1, E1>, ...(T | Impl3<B, '0', E2>)[number][]];
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
