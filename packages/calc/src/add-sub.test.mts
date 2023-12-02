import { Add, Dec, Inc, Sub } from './add-sub.mjs';
import { AssertEq } from '@stump/base';

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
