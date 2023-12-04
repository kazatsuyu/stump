import { BitAnd, BitOr, BitXor } from './bit.mjs';
import { AssertEq } from '@stump/base';

namespace _test {
  type _Test = [
    AssertEq<BitAnd<'0', '10'>, '0'>,
    AssertEq<BitAnd<'-1', '10'>, '10'>,
    AssertEq<BitAnd<'10', '0'>, '0'>,
    AssertEq<BitAnd<'10', '-1'>, '10'>,
    AssertEq<BitAnd<'10', '1'>, '0'>,
    AssertEq<BitAnd<'11', '1'>, '1'>,
    AssertEq<BitAnd<'123456789', '987654321'>, '39471121'>,
    AssertEq<BitAnd<'-3', '-2'>, '-4'>,
    AssertEq<BitAnd<'-123456789', '-987654321'>, '-1071639989'>,
    AssertEq<BitAnd<`${0x123456789abcdefn}`, `${0xfedcba987654321n}`>, `${0x121412181214121n}`>,
    AssertEq<BitOr<'0', '10'>, '10'>,
    AssertEq<BitOr<'-1', '10'>, '-1'>,
    AssertEq<BitOr<'10', '0'>, '10'>,
    AssertEq<BitOr<'10', '-1'>, '-1'>,
    AssertEq<BitOr<'10', '1'>, '11'>,
    AssertEq<BitOr<'11', '1'>, '11'>,
    AssertEq<BitOr<'123456789', '987654321'>, '1071639989'>,
    AssertEq<BitOr<'-3', '-2'>, '-1'>,
    AssertEq<BitOr<'-123456789', '-987654321'>, '-39471121'>,
    AssertEq<BitOr<`${0x123456789abcdefn}`, `${0xfedcba987654321n}`>, `${0xfefcfef8fefcfefn}`>,
    AssertEq<BitXor<'0', '10'>, '10'>,
    AssertEq<BitXor<'-1', '10'>, '-11'>,
    AssertEq<BitXor<'10', '0'>, '10'>,
    AssertEq<BitXor<'10', '-1'>, '-11'>,
    AssertEq<BitXor<'10', '1'>, '11'>,
    AssertEq<BitXor<'11', '1'>, '10'>,
    AssertEq<BitXor<'123456789', '987654321'>, '1032168868'>,
    AssertEq<BitXor<'-3', '-2'>, '3'>,
    AssertEq<BitXor<'-123456789', '-987654321'>, '1032168868'>,
    AssertEq<BitXor<`${0x123456789abcdefn}`, `${0xfedcba987654321n}`>, `${0xece8ece0ece8ecen}`>,
  ][number];
}
