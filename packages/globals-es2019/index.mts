import '@stump/globals';
import { Flatten, ToInt } from '@stump/stump';

declare global {
  interface ReadonlyArray<T> {
    flat<A, D extends number = 1>(
      this: A,
      depth?: D,
    ): number extends this['length'] ? FlatArray<A, D>[] : Flatten<this, ToInt<D>>;
  }

  interface Array<T> {
    flat<A, D extends number = 1>(
      this: A,
      depth?: D,
    ): number extends this['length'] ? FlatArray<A, D>[] : Flatten<this, ToInt<D>>;
  }
}
