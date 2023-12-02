import { StrLen } from './utils.mjs';
import { AssertEq } from '@stump/base';

namespace _test {
  type _Test = [AssertEq<StrLen<''>, '0'>, AssertEq<StrLen<'🪵'>, '2'>][number];
}
