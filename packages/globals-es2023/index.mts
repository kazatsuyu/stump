import '@stump/globals-es2022';
import type { Add, Int, Last, Max, Min, Minus, Primitive, Reverse, Slice, ToInt } from '@stump/stump';

declare global {
  interface ReadonlyArray<T> {
    toReversed(): number extends this['length'] ? T[] : Reverse<this>;

    toSpliced<S extends number, D extends number, Items extends (Primitive | {})[]>(
      start: S,
      deleteCount: D,
      ...items: Items
    ): [...Items, ...Slice<this, '0', ToInt<S>>, ...Slice<this, SpliceEndPos<S, D>>];

    toSpliced<S extends number>(start: S): [...Slice<this, '0', ToInt<S>>, ...Slice<this, Last>];
  }

  interface Array<T> {
    toReversed(): number extends this['length'] ? T[] : Reverse<this>;

    toSpliced<S extends number, D extends number, Items extends (Primitive | {})[]>(
      start: S,
      deleteCount: D,
      ...items: Items
    ): [...Items, ...Slice<this, '0', ToInt<S>>, ...Slice<this, SpliceEndPos<S, D>>];

    toSpliced<S extends number>(start: S): [...Slice<this, '0', ToInt<S>>, ...Slice<this, Last>];
  }
}

type SpliceEndPos<
  S extends number,
  D extends number,
  S1 extends Int = ToInt<S>,
  D1 extends Int = Max<'0', ToInt<D>>,
  M extends Int = Min<'0', Add<S1, D1>>,
> = S1 extends Minus ? (S1 extends '-0' ? Add<S1, D1> : M extends '0' ? Last : M) : Add<S1, D1>;
