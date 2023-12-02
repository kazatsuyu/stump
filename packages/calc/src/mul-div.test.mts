import { Div, Div2, Mod, Mul } from './mul-div.mjs';
import { AssertEq } from '@stump/base';

namespace _test {
  type _Test = [
    AssertEq<Mul<'1234', '5678'>, '7006652'>,
    AssertEq<Mul<'1234567890', '1234567890'>, '1524157875019052100'>,
    AssertEq<Mul<'1234', '0'>, '0'>,
    AssertEq<Mul<'1234', '1'>, '1234'>,
    AssertEq<Div<'1234', '0'>, never>,
    AssertEq<Div<'1234', '1'>, '1234'>,
    AssertEq<Div<'1234', '2'>, '617'>,
    AssertEq<Div<'1234', '3'>, '411'>,
    AssertEq<Div<'212', '2'>, '106'>,
    AssertEq<Div<'1234', '6789'>, '0'>,
    AssertEq<Div<'12345', '6789'>, '1'>,
    AssertEq<Div<'6789', '1234'>, '5'>,
    AssertEq<Div<'1234', '1234'>, '1'>,
    AssertEq<Div<'7006652', '1234'>, '5678'>,
    AssertEq<Div2<'12345'>, '6172'>,
    AssertEq<Div2<'1'>, '0'>,
    AssertEq<Div2<'2'>, '1'>,
    AssertEq<Div2<'10'>, '5'>,
    AssertEq<Mod<'123', '7'>, '4'>,
  ][number];
}
