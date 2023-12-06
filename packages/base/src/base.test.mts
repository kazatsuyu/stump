import { AltUnknown, Extends, ToBigint, ToNumber, ToString } from './base.mjs';
import { Assert, AssertEq } from './test-utils.mjs';

namespace _test {
  type _Test = [
    AssertEq<ToString<10>, '10'>,
    AssertEq<ToNumber<'1.25e+100'>, 1.25e100>,
    AssertEq<ToBigint<'10'>, 10n>,
    Assert<Extends<AltUnknown, unknown>>,
  ][number];
}
