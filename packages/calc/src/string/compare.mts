import type { Digits } from '../int-str.mjs';
import type { Abs, Sign } from './sign.mjs';
import type { Extends, Not } from '@stump/base';

export type Eq<T1 extends string, T2 extends string> = T1 | T2 extends '0' | '-0' ? true : Extends<[T1, T2], [T2, T1]>;

export type Ne<T1 extends string, T2 extends string> = Not<Eq<T1, T2>>;

export type Gt<T1 extends string, T2 extends string> = gt.Impl0<T1, T2>;

namespace gt {
  export type Impl0<T1 extends string, T2 extends string> = Eq<T1, T2> extends true
    ? false
    : {
        '+': {
          '+': Impl1<T1, T2>;
          '-': true;
        };
        '-': {
          '+': false;
          '-': Impl1<Abs<T2>, Abs<T1>>;
        };
      }[Sign<T1>][Sign<T2>];

  type Impl1<T1 extends string, T2 extends string> = [T1, T2] extends [`${infer U1}${Digits}`, `${infer U2}${Digits}`]
    ? [T1, T2] extends [`${U1}${infer D1 extends Digits}`, `${U2}${infer D2 extends Digits}`]
      ? Impl2<U1, D1, U2, D2>
      : never
    : never;

  type Impl2<T1 extends string, D1 extends Digits, T2 extends string, D2 extends Digits> = T1 extends T2
    ? Table[D1][D2]
    : T1 extends ''
      ? false
      : T2 extends ''
        ? true
        : Impl1<T1, T2>;

  type Table = [
    [false, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, true, false, false, false, false, false, false, false, false],
    [true, true, true, false, false, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false, false],
    [true, true, true, true, true, false, false, false, false, false],
    [true, true, true, true, true, true, false, false, false, false],
    [true, true, true, true, true, true, true, false, false, false],
    [true, true, true, true, true, true, true, true, false, false],
    [true, true, true, true, true, true, true, true, true, false],
  ];
}

export type Ge<T1 extends string, T2 extends string> = Not<Gt<T2, T1>>;

export type Le<T1 extends string, T2 extends string> = Not<Gt<T1, T2>>;

export type Lt<T1 extends string, T2 extends string> = Gt<T2, T1>;

export type Cmp<T1 extends string, T2 extends string> = Gt<T1, T2> extends true
  ? '1'
  : Gt<T2, T1> extends true
    ? '-1'
    : '0';

type NormalizeZero<T extends string> = T extends '-0' ? '0' : T;

export type Max<T1 extends string, T2 extends string> = NormalizeZero<Gt<T1, T2> extends true ? T1 : T2>;

export type Min<T1 extends string, T2 extends string> = NormalizeZero<Lt<T1, T2> extends true ? T1 : T2>;
