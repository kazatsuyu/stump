import '@stump/globals-es2019';
import type { At, Int } from '@stump/stump';

declare global {
  interface ReadonlyArray<T> {
    at<I extends number>(index: I): At<this, Extract<`${I}`, Int>>;
  }

  interface Array<T> {
    at<I extends number>(index: I): At<this, Extract<`${I}`, Int>>;
  }
}
