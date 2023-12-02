import type { Extends } from '../base.mjs';
import type { Assert } from '../test-utils.mjs';
import type * as S from './string/digits.mjs';

export type Digits = S.Digits;
export type DigitsWithout9 = S.DigitsWithout9;
export type DigitsWithout0 = S.DigitsWithout0;
export type Int = `${bigint}`;
export type Plus = Int & (Digits | `${DigitsWithout0}${string}`);
export type Minus = Int & `-${string}`;

export type IntLike = Int | number | bigint;
export type ToInt<N extends IntLike> = Extract<`${N}`, Int>;

namespace _test {
  type _Test = [
    Assert<Extends<Plus, Int>>,
    Assert<Extends<Minus, Int>>,
    Assert<Extends<'0', Plus>>,
    Assert<Extends<'1', Plus>>,
    Assert<Extends<'10', Plus>>,
    Assert<Extends<'100', Plus>>,
    Assert<Extends<'314', Plus>>,
    Assert<Extends<'-0', Minus>>,
    Assert<Extends<'-1', Minus>>,
    Assert<Extends<'-10', Minus>>,
    Assert<Extends<'-100', Minus>>,
    Assert<Extends<'-314', Minus>>,
  ][number];
}
