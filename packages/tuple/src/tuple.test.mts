import { Fill, Flatten, IndexSequence, Reverse, ReverseSequence, Slice } from './tuple.mjs';
import { AssertEq } from '@stump/base';

namespace _test {
  type _Test = [
    AssertEq<Fill<0, '15'>, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>,
    AssertEq<IndexSequence<'15'>, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']>,
    AssertEq<IndexSequence<'3', '4'>, ['4', '5', '6']>,
    AssertEq<ReverseSequence<'15'>, ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']>,
    AssertEq<ReverseSequence<'3', '8'>, ['10', '9', '8']>,
    AssertEq<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '1', '4'>, ['b', 'c', 'd']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '4', '1'>, []>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '-3', '-1'>, ['c', 'd']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '-3'>, ['c', 'd', 'e']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e']>, ['a', 'b', 'c', 'd', 'e']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], undefined, '3'>, ['a', 'b', 'c']>,
    AssertEq<Slice<['a', 'b', 'c', 'd', 'e'], '1', '-1'>, ['b', 'c', 'd']>,
    AssertEq<Flatten<[['a'], [], [0, 1, 2], [[], [[]]]]>, ['a', 0, 1, 2, [], [[]]]>,
  ][number];
}
