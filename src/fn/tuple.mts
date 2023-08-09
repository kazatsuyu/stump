import { Args, Fn } from '../fn.mjs';
import { FoldL, FoldR, Map } from '../tuple.mjs';

interface MapFn<F extends Fn> extends Fn<F['args'][]> {
  return: Map<Args<this, MapFn<F>>, F>;
}

export interface MapF extends Fn {
  args: Fn;
  return: MapFn<Args<this, MapF>>;
}

interface FoldLFn<F extends Fn<[unknown, unknown]>> extends Fn<[F['args'][1][], F['args'][0]]> {
  return: FoldL<Args<this, FoldLFn<F>>[0], F, Args<this, FoldLFn<F>>[1]>;
}

export interface FoldLF extends Fn<Fn<[unknown, unknown]>> {
  return: FoldLFn<Args<this, FoldLF>>;
}

interface FoldRFn<F extends Fn<[unknown, unknown]>> extends Fn<[F['args'][1][], F['args'][0]]> {
  return: FoldR<Args<this, FoldRFn<F>>[0], F, Args<this, FoldRFn<F>>[1]>;
}

export interface FoldRF extends Fn<Fn<[unknown, unknown]>> {
  return: FoldRFn<Args<this, FoldRF>>;
}
