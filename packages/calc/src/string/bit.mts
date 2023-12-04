import { Dec, Inc } from './add-sub.mjs';
import { Div2, Mul } from './mul-div.mjs';
import { Inv } from './sign.mjs';

export type BitInv<T extends string> = Inv<Inc<T>>;

export type RShift<T1 extends string, T2 extends string> = [T1, T2] extends { 0: '0' | '-0' | '-1' } | { 1: '0' | '-0' }
  ? T1
  : RShift<T1 extends `-${string}` ? Div2<Dec<T1>> : Div2<T1>, Dec<T2>>;

export type LShift<T1 extends string, T2 extends string> = [T1, T2] extends { 0: '0' | '-0' } | { 1: '0' | '-0' }
  ? T1
  : LShift<Mul<T1, '2'>, Dec<T2>>;

export type BitAnd<T1 extends string, T2 extends string> = bitAnd.Impl1<T1, T2>;

namespace bitAnd {
  export type Impl1<T1 extends string, T2 extends string> = [T1, T2] extends
    | { 0: '0' | '-0' | '-1' }
    | { 1: '0' | '-0' | '-1' }
    ? [T1, T2] extends { 0: '0' } | { 1: '-1' }
      ? T1
      : T2
    : Impl1<RShift<T1, '1'>, RShift<T2, '1'>> extends infer U extends string
      ? [T1, T2] extends [Odd, Odd]
        ? Inc<LShift<U, '1'>>
        : LShift<U, '1'>
      : never;
}

type Odd = `${string}${'1' | '3' | '5' | '7' | '9'}`;

export type BitOr<T1 extends string, T2 extends string> = bitOr.Impl1<T1, T2>;

namespace bitOr {
  export type Impl1<T1 extends string, T2 extends string> = [T1, T2] extends
    | { 0: '0' | '-0' | '-1' }
    | { 1: '0' | '-0' | '-1' }
    ? [T1, T2] extends { 0: '0' } | { 1: '-1' }
      ? T2
      : T1
    : Impl1<RShift<T1, '1'>, RShift<T2, '1'>> extends infer U extends string
      ? [T1, T2] extends [Even, Even]
        ? LShift<U, '1'>
        : Inc<LShift<U, '1'>>
      : never;
}

type Even = `${string}${'0' | '2' | '4' | '6' | '8'}`;

export type BitXor<T1 extends string, T2 extends string> = bitXor.Impl1<T1, T2>;

namespace bitXor {
  export type Impl1<T1 extends string, T2 extends string> = [T1, T2] extends
    | { 0: '0' | '-0' | '-1' }
    | { 1: '0' | '-0' | '-1' }
    ? [T1, T2] extends { 0: '-1' } | { 1: '-1' }
      ? BitInv<T1 extends '-1' ? T2 : T1>
      : T1 extends '0' | '-0'
        ? T2
        : T1
    : Impl1<RShift<T1, '1'>, RShift<T2, '1'>> extends infer U extends string
      ? [T1, T2] extends [Even, Odd] | [Odd, Even]
        ? Inc<LShift<U, '1'>>
        : LShift<U, '1'>
      : never;
}
