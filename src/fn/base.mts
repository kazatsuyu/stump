import { ToBigint, ToNumber, ToString } from '../base.mjs';
import { Args, Fn } from '../fn.mjs';

export interface ToStringF extends Fn<string | number | bigint | boolean | undefined | null, string> {
  return: ToString<Args<this, ToStringF>>;
}

export interface ToNumberF extends Fn<`${number}`, number> {
  return: ToNumber<Args<this, ToNumberF>>;
}

export interface ToBigintF extends Fn<`${bigint}`, bigint> {
  return: ToBigint<Args<this, ToBigintF>>;
}
