import * as calc from './fn/calc.mjs';
import { AssertEq } from './test-utils.mjs';

export import calc = calc;

export type Fn<Args = unknown, Return = unknown> = {
  args: Args;
  return: Return;
};

export type Call<F extends Fn, Args extends F['args']> = (F & {
  args: Args;
})['return'];

export interface Compose<F1 extends Fn, F2 extends Fn<F1['return']>> extends Fn<F1['args'], F2['return']> {
  return: Call<F2, Call<F1, Args<this, Compose<F1, F2>>>>;
}

export interface ComposeF extends Fn<[Fn, Fn], Fn> {
  return: Compose<Args<this, ComposeF>[0], Args<this, ComposeF>[1]>;
}

export type Args<This extends F, F extends Fn> = Extract<
  This extends F & infer T ? T : This,
  { args: F['args'] }
>['args'];

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
