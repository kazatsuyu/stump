import type stump from 'stump';

export type Add = stump.Add<'1', '2'>;
//          ^?

export type Sub = stump.Sub<'8', '15'>;
//          ^?

export type Mul = stump.Mul<'12', '34'>;
//          ^?

export type Div = stump.Div<'123', '4'>;
//          ^?

export type Fill = stump.Fill<string, '10'>;
//          ^?

export type Index = stump.IndexSequence<'20'>;
//          ^?

export type Map = stump.Map<Index, stump.fn.ToNumberF>;
//          ^?

export type Slice = stump.Slice<Index, '3', '-3'>;
//          ^?

interface F extends stump.Fn<stump.Int, boolean> {
  return: stump.Ne<stump.Mod<stump.Args<this, F>, '3'>, '0'>;
}

export type Filter = stump.Filter<Index, F>;
//          ^?
