import type { Add, Dec, Inc, Sub } from '../calc/add-sub.mjs';
import type { Cmp, Eq, Ge, Gt, Le, Lt, Max, Min, Ne } from '../calc/compare.mjs';
import type { Int } from '../calc/int-str.mjs';
import type { Div, Div2, Mod, Mul } from '../calc/mul-div.mjs';
import type { Abs, Inv, Sign } from '../calc/sign.mjs';
import type { Args, Fn } from '../fn.mjs';

export interface EqF extends Fn<[Int, Int], boolean> {
  return: Eq<Args<this, EqF>[0], Args<this, EqF>[1]>;
}

export interface NeF extends Fn<[Int, Int], boolean> {
  return: Ne<Args<this, NeF>[0], Args<this, NeF>[1]>;
}

export interface GtF extends Fn<[Int, Int], boolean> {
  return: Gt<Args<this, GtF>[0], Args<this, GtF>[1]>;
}

export interface GeF extends Fn<[Int, Int], boolean> {
  return: Ge<Args<this, GeF>[0], Args<this, GeF>[1]>;
}

export interface LeF extends Fn<[Int, Int], boolean> {
  return: Le<this['args'][0], this['args'][1]>;
}

export interface LtF extends Fn<[Int, Int], boolean> {
  return: Lt<Args<this, LtF>[0], Args<this, LtF>[1]>;
}

export interface CmpF extends Fn<[Int, Int], -1 | 0 | 1> {
  return: Cmp<Args<this, CmpF>[0], Args<this, CmpF>[1]>;
}

export interface MaxF extends Fn<[Int, Int], Int> {
  return: Max<Args<this, MaxF>[0], Args<this, MaxF>[1]>;
}

export interface MinF extends Fn<[Int, Int], Int> {
  return: Min<Args<this, MinF>[0], Args<this, MinF>[1]>;
}

export interface SignF extends Fn {
  args: Int;
  return: Sign<Args<this, SignF>>;
}

export interface AbsF extends Fn {
  args: Int;
  return: Abs<Args<this, AbsF>>;
}

export interface InvF extends Fn {
  args: Int;
  return: Inv<Args<this, InvF>>;
}

export interface IncF extends Fn<Int, Int> {
  return: Inc<Args<this, IncF>>;
}

export interface DecF extends Fn<Int, Int> {
  return: Dec<Args<this, DecF>>;
}

export interface AddF extends Fn<[Int, Int], Int> {
  return: Add<Args<this, AddF>[0], Args<this, AddF>[1]>;
}

export interface SubF extends Fn<[Int, Int], Int> {
  return: Sub<Args<this, SubF>[0], Args<this, SubF>[1]>;
}

export interface MulF extends Fn<[Int, Int]> {
  return: Mul<Args<this, MulF>[0], Args<this, MulF>[1]>;
}

export interface DivF extends Fn<[Int, Int]> {
  return: Div<Args<this, DivF>[0], Args<this, DivF>[1]>;
}

export interface Div2F extends Fn<Int> {
  return: Div2<Args<this, Div2F>>;
}

// TODO: 再帰上限に引っかからないようにする
// export interface ModF extends Fn<[Int, Int]> {
//   return: Mod<Args<this, ModF>[0], Args<this, ModF>[1]>;
// }
