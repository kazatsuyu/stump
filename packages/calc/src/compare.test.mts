import { Eq, Ge, Gt, Le, Lt } from './compare.mjs';
import { Assert, AssertNot } from '@stump/base';

namespace _test {
  type _Test = [
    Assert<Eq<'0', '0'>>,
    Assert<Eq<'0', '-0'>>,
    Assert<Eq<'-0', '0'>>,
    Assert<Eq<'-0', '-0'>>,
    Assert<Eq<'1', '1'>>,
    Assert<Gt<'1', '0'>>,
    Assert<Gt<'10', '9'>>,
    Assert<Gt<'101', '100'>>,
    Assert<Gt<'101', '11'>>,
    Assert<Gt<'-0', '-1'>>,
    Assert<Gt<'-9', '-10'>>,
    Assert<Gt<'-100', '-101'>>,
    Assert<Gt<'-11', '-101'>>,
    AssertNot<Gt<'1', '1'>>,
    AssertNot<Gt<'0', '-0'>>,
    AssertNot<Gt<'0', '1'>>,
    Assert<Ge<'1', '1'>>,
    Assert<Ge<'101', '11'>>,
    Assert<Le<'1', '1'>>,
    Assert<Le<'11', '101'>>,
    AssertNot<Lt<'1', '1'>>,
    Assert<Lt<'11', '101'>>,
  ][number];
}
