import { Assert, AssertEq, AssertNot } from './test-utils.mjs';

namespace _test {
  type _Test = [Assert<true>, AssertNot<false>, AssertEq<10, 10>][number];
}
