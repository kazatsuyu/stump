import type { Args, Call, Compose, Fn } from '../fn.mjs';
import type { AssertEq } from '../test-utils.mjs';

export interface ComposeF extends Fn<[Fn, Fn], Fn> {
  return: Compose<Args<this, ComposeF>[0], Args<this, ComposeF>[1]>;
}

namespace _test {
  interface TestFn extends Fn<string, string> {
    args: string;
    return: `${Args<this, TestFn>}${Args<this, TestFn>}`;
  }

  type _Test = [
    AssertEq<Call<TestFn, 'abc'>, 'abcabc'>,
    AssertEq<Call<Call<ComposeF, [TestFn, TestFn]>, 'abc'>, 'abcabcabcabc'>,
  ][number];
}
