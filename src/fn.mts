import type * as base from './fn/base.mjs';
import type * as calc from './fn/calc.mjs';
import type * as fn from './fn/fn.mjs';
import type * as tuple from './fn/tuple.mjs';

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

export type Args<This extends F, F extends Fn> = Extract<
  This extends F & infer T ? T : This,
  { args: F['args'] }
>['args'];

export type { base, calc, fn, tuple };
