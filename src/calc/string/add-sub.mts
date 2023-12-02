import type { AssertEq } from '../../test-utils.mjs';
import type { Gt } from './compare.mjs';
import type { Digits, DigitsWithout9, DigitsWithout0 } from './digits.mjs';
import type { Abs, Inv, Sign } from './sign.mjs';

export type Inc<T extends string> = inc.Impl0<T>;

namespace inc {
  export type Impl0<T extends string> = T extends `-${infer U}` ? Inv<dec.Impl1<U>> : Impl1<T>;

  export type Impl1<T extends string> = T extends `${infer U}${Digits}`
    ? T extends `${U}${infer D extends Digits}`
      ? U extends ''
        ? Table[D]
        : D extends DigitsWithout9
          ? `${U}${Table[D]}`
          : `${Impl1<U>}0`
      : never
    : never;

  type Table = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
}

export type Dec<T extends string> = dec.Impl0<T>;

namespace dec {
  export type Impl0<T extends string> = T extends `-${infer U}` ? `-${inc.Impl1<U>}` : Impl1<T>;

  export type Impl1<T extends string, Table extends Table0 | Table1 = Table0> = T extends `${infer U}${Digits}`
    ? T extends `${U}${infer D extends Digits}`
      ? U extends ''
        ? Table[D]
        : D extends DigitsWithout0
          ? `${U}${Table0[D]}`
          : `${Impl1<U, Table1>}9`
      : never
    : never;

  export type Impl2<T extends string> = Impl1<T, Table1>;

  type Table0 = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8'];
  type Table1 = [never, '', '1', '2', '3', '4', '5', '6', '7', '8'];
}

export type Add<T1 extends string, T2 extends string> = add.Impl0<Abs<T1>, Abs<T2>, `${Sign<T1>}${Sign<T2>}`>;

namespace add {
  export type Impl0<T1 extends string, T2 extends string, S extends '++' | '+-' | '-+' | '--'> = {
    '++': Impl1<T1, T2>;
    '+-': sub.Impl1<T1, T2>;
    '-+': sub.Impl1<T2, T1>;
    '--': Inv<Impl1<T1, T2>>;
  }[S];

  export type Impl1<T1 extends string, T2 extends string, C extends '' | '1' = ''> = [T1, T2] extends [
    `${infer U1}${Digits}`,
    `${infer U2}${Digits}`,
  ]
    ? [T1, T2] extends [`${U1}${infer D1 extends Digits}`, `${U2}${infer D2 extends Digits}`]
      ? Impl2<U1, D1, U2, D2, C>
      : never
    : never;

  type Impl2<T1 extends string, D1 extends Digits, T2 extends string, D2 extends Digits, C extends '' | '1'> = `${
    | T1
    | T2 extends ''
    ? Carry[C][D1][D2]
    : '' extends T1 | T2
      ? {
          '': `${T1}${T2}`;
          '1': inc.Impl1<`${T1}${T2}`>;
        }[Carry[C][D1][D2]]
      : Impl1<T1, T2, Carry[C][D1][D2]>}${Table[C][D1][D2]}`;

  type Table = {
    '': [
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '0', '1'],
      ['3', '4', '5', '6', '7', '8', '9', '0', '1', '2'],
      ['4', '5', '6', '7', '8', '9', '0', '1', '2', '3'],
      ['5', '6', '7', '8', '9', '0', '1', '2', '3', '4'],
      ['6', '7', '8', '9', '0', '1', '2', '3', '4', '5'],
      ['7', '8', '9', '0', '1', '2', '3', '4', '5', '6'],
      ['8', '9', '0', '1', '2', '3', '4', '5', '6', '7'],
      ['9', '0', '1', '2', '3', '4', '5', '6', '7', '8'],
    ];
    '1': [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '0', '1'],
      ['3', '4', '5', '6', '7', '8', '9', '0', '1', '2'],
      ['4', '5', '6', '7', '8', '9', '0', '1', '2', '3'],
      ['5', '6', '7', '8', '9', '0', '1', '2', '3', '4'],
      ['6', '7', '8', '9', '0', '1', '2', '3', '4', '5'],
      ['7', '8', '9', '0', '1', '2', '3', '4', '5', '6'],
      ['8', '9', '0', '1', '2', '3', '4', '5', '6', '7'],
      ['9', '0', '1', '2', '3', '4', '5', '6', '7', '8'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ];
  };

  type Carry = {
    '': [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '1'],
      ['', '', '', '', '', '', '', '', '1', '1'],
      ['', '', '', '', '', '', '', '1', '1', '1'],
      ['', '', '', '', '', '', '1', '1', '1', '1'],
      ['', '', '', '', '', '1', '1', '1', '1', '1'],
      ['', '', '', '', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ];
    '1': [
      ['', '', '', '', '', '', '', '', '', '1'],
      ['', '', '', '', '', '', '', '', '1', '1'],
      ['', '', '', '', '', '', '', '1', '1', '1'],
      ['', '', '', '', '', '', '1', '1', '1', '1'],
      ['', '', '', '', '', '1', '1', '1', '1', '1'],
      ['', '', '', '', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ];
  };
}

export type Sub<T1 extends string, T2 extends string> = sub.Impl0<Abs<T1>, Abs<T2>, `${Sign<T1>}${Sign<T2>}`>;

namespace sub {
  export type Impl0<T1 extends string, T2 extends string, S extends '++' | '+-' | '-+' | '--'> = {
    '++': Impl1<T1, T2>;
    '+-': add.Impl1<T1, T2>;
    '-+': Inv<add.Impl1<T1, T2>>;
    '--': Impl1<T2, T1>;
  }[S];

  export type Impl1<T1 extends string, T2 extends string> = Gt<T1, T2> extends true
    ? Impl2<T1, T2>
    : Inv<Impl2<T2, T1>>;

  type Impl2<T1 extends string, T2 extends string, C extends '' | '1' = ''> = [T1, T2] extends [
    `${infer U1 extends string}${Digits}`,
    `${infer U2 extends string}${Digits}`,
  ]
    ? [T1, T2] extends [`${U1}${infer D1 extends Digits}`, `${U2}${infer D2 extends Digits}`]
      ? Impl3<U1, D1, U2, D2, C>
      : never
    : never;

  type Impl3<
    T1 extends string,
    D1 extends Digits,
    T2 extends string,
    D2 extends Digits,
    C extends '' | '1',
  > = `${T1 extends ''
    ? ''
    : ToEmpty<
        T2 extends '' ? (Carry[C][D1][D2] extends '' ? T1 : dec.Impl2<T1>) : Impl2<T1, T2, Carry[C][D1][D2]>
      >}${Table[C][D1][D2]}`;

  type ToEmpty<T extends string> = T extends '0' ? '' : T;
  type Table = {
    '': [
      ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
      ['1', '0', '9', '8', '7', '6', '5', '4', '3', '2'],
      ['2', '1', '0', '9', '8', '7', '6', '5', '4', '3'],
      ['3', '2', '1', '0', '9', '8', '7', '6', '5', '4'],
      ['4', '3', '2', '1', '0', '9', '8', '7', '6', '5'],
      ['5', '4', '3', '2', '1', '0', '9', '8', '7', '6'],
      ['6', '5', '4', '3', '2', '1', '0', '9', '8', '7'],
      ['7', '6', '5', '4', '3', '2', '1', '0', '9', '8'],
      ['8', '7', '6', '5', '4', '3', '2', '1', '0', '9'],
      ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
    ];
    '1': [
      ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
      ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
      ['1', '0', '9', '8', '7', '6', '5', '4', '3', '2'],
      ['2', '1', '0', '9', '8', '7', '6', '5', '4', '3'],
      ['3', '2', '1', '0', '9', '8', '7', '6', '5', '4'],
      ['4', '3', '2', '1', '0', '9', '8', '7', '6', '5'],
      ['5', '4', '3', '2', '1', '0', '9', '8', '7', '6'],
      ['6', '5', '4', '3', '2', '1', '0', '9', '8', '7'],
      ['7', '6', '5', '4', '3', '2', '1', '0', '9', '8'],
      ['8', '7', '6', '5', '4', '3', '2', '1', '0', '9'],
    ];
  };

  type Carry = {
    '': [
      ['', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '', '', '1', '1', '1', '1', '1'],
      ['', '', '', '', '', '', '1', '1', '1', '1'],
      ['', '', '', '', '', '', '', '1', '1', '1'],
      ['', '', '', '', '', '', '', '', '1', '1'],
      ['', '', '', '', '', '', '', '', '', '1'],
      ['', '', '', '', '', '', '', '', '', ''],
    ];
    '1': [
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '1', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '', '1', '1', '1', '1', '1', '1'],
      ['', '', '', '', '', '1', '1', '1', '1', '1'],
      ['', '', '', '', '', '', '1', '1', '1', '1'],
      ['', '', '', '', '', '', '', '1', '1', '1'],
      ['', '', '', '', '', '', '', '', '1', '1'],
      ['', '', '', '', '', '', '', '', '', '1'],
    ];
  };
}

namespace _test {
  type _Test = [
    AssertEq<Inc<'-1'>, '0'>,
    AssertEq<Inc<'0'>, '1'>,
    AssertEq<Inc<'9'>, '10'>,
    AssertEq<Inc<'99'>, '100'>,
    AssertEq<Inc<'123'>, '124'>,
    AssertEq<Dec<'0'>, '-1'>,
    AssertEq<Dec<'1'>, '0'>,
    AssertEq<Dec<'10'>, '9'>,
    AssertEq<Dec<'100'>, '99'>,
    AssertEq<Dec<'123'>, '122'>,
    AssertEq<Add<'1', '1'>, '2'>,
    AssertEq<Add<'1', '9'>, '10'>,
    AssertEq<Add<'11', '9'>, '20'>,
    AssertEq<Add<'99', '1'>, '100'>,
    AssertEq<Add<'1234', '5678'>, '6912'>,
    AssertEq<Sub<'1', '1'>, '0'>,
    AssertEq<Sub<'1', '9'>, '-8'>,
    AssertEq<Sub<'11', '9'>, '2'>,
    AssertEq<Sub<'99', '1'>, '98'>,
    AssertEq<Sub<'1234', '5678'>, '-4444'>,
    AssertEq<Sub<'100', '99'>, '1'>,
  ][number];
}
