import type * as stump from '@stump/stump';

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

export type Slice = stump.Slice<Index, '3', '-3'>;
//          ^?
