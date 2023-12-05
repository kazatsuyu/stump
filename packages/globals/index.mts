import type { AltUnknown, Entries, Flatten, Join, Last, RevEntries, Slice, ToInt } from '@stump/stump';

declare global {
  interface ReadonlyArray<T> {
    concat<Items extends readonly (AltUnknown | readonly AltUnknown[])[]>(...items: Items): Flatten<[this, ...Items]>;

    entries(): IterableIterator<Entries<this>>;

    join<S extends string | undefined = undefined>(separator?: S): Join<this, S extends string ? S : ','>;

    keys(): IterableIterator<keyof this>;

    slice<S extends number | undefined = undefined, E extends number | undefined = undefined>(
      start?: S,
      end?: E,
    ): number extends S | E ? T[] : Slice<this, S extends number ? ToInt<S> : '0', E extends number ? ToInt<E> : Last>;

    forEach(f: (this: this, ...args: [...RevEntries<this>, array: this]) => void): void;

    forEach<This = this>(f: (this: This, ...args: [...RevEntries<this>, array: this]) => void, thisArg: This): void;
  }

  interface Array<T> {
    concat<Items extends readonly (AltUnknown | readonly AltUnknown[])[]>(...items: Items): Flatten<[this, ...Items]>;

    entries(): IterableIterator<Entries<this>>;

    join<S extends string | undefined = undefined>(separator?: S): Join<this, S extends string ? S : ','>;

    keys(): IterableIterator<keyof this>;

    slice<S extends number | undefined = undefined, E extends number | undefined = undefined>(
      start?: S,
      end?: E,
    ): number extends S | E ? T[] : Slice<this, S extends number ? ToInt<S> : '0', E extends number ? ToInt<E> : Last>;

    forEach(f: (this: this, ...args: [...RevEntries<this>, array: this]) => void): void;

    forEach<This = this>(f: (this: This, ...args: [...RevEntries<this>, array: this]) => void, thisArg: This): void;
  }
}
