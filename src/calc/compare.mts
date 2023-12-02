import type { Extends, Not } from '../base.mjs';
import type { Assert, AssertNot } from '../test-utils.mjs';
import type { Digits, Int, Plus } from './int-str.mjs';
import type { Abs, Sign } from './sign.mjs';

export type Eq<T1 extends Int, T2 extends Int> = T1 | T2 extends '0' | '-0' ? true : Extends<[T1, T2], [T2, T1]>;

export type Ne<T1 extends Int, T2 extends Int> = Not<Eq<T1, T2>>;

export type Gt<T1 extends Int, T2 extends Int> = gt.Impl0<T1, T2>;

namespace gt {
  export type Impl0<T1 extends Int, T2 extends Int> = Eq<T1, T2> extends true
    ? false
    : {
        '+': {
          '+': Impl1<Extract<T1, Plus>, Extract<T2, Plus>>;
          '-': true;
        };
        '-': {
          '+': false;
          '-': Impl1<Abs<T2>, Abs<T1>>;
        };
      }[Sign<T1>][Sign<T2>];

  type Impl1<T1 extends Plus, T2 extends Plus> = [T1, T2] extends [`${infer U1}${Digits}`, `${infer U2}${Digits}`]
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
    : Impl1<Extract<T1, Plus>, Extract<T2, Plus>>;

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

export type Ge<T1 extends Int, T2 extends Int> = Not<Gt<T2, T1>>;

export type Le<T1 extends Int, T2 extends Int> = Not<Gt<T1, T2>>;

export type Lt<T1 extends Int, T2 extends Int> = Gt<T2, T1>;

export type Cmp<T1 extends Int, T2 extends Int> = Gt<T1, T2> extends true ? 1 : Gt<T2, T1> extends true ? -1 : 0;

export type Max<T1 extends Int, T2 extends Int> = Gt<T1, T2> extends true ? T1 : T2;

export type Min<T1 extends Int, T2 extends Int> = Lt<T1, T2> extends true ? T1 : T2;

namespace _test {
  type _Test = [
    Assert<Eq<'0', '0'>>,
    Assert<Eq<'0', '-0'>>,
    Assert<Eq<'-0', '0'>>,
    Assert<Eq<'-0', '-0'>>,
    Assert<Eq<'1', '1'>>,
    Assert<Gt<'1', '0'>>,
    Assert<Gt<'10', '9'>>,
    Assert<Gt<'101', '100'>>,
    Assert<Gt<'101', '11'>>,
    Assert<Gt<'-0', '-1'>>,
    Assert<Gt<'-9', '-10'>>,
    Assert<Gt<'-100', '-101'>>,
    Assert<Gt<'-11', '-101'>>,
    AssertNot<Gt<'1', '1'>>,
    AssertNot<Gt<'0', '-0'>>,
    AssertNot<Gt<'0', '1'>>,
    Assert<Ge<'1', '1'>>,
    Assert<Ge<'101', '11'>>,
    Assert<Le<'1', '1'>>,
    Assert<Le<'11', '101'>>,
    AssertNot<Lt<'1', '1'>>,
    Assert<Lt<'11', '101'>>,
  ][number];
}