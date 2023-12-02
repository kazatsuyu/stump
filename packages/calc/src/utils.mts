import { Plus } from './int-str.mjs';
import * as S from './string/utils.mjs';

export type StrLen<S extends string> = Extract<S.StrLen<S>, Plus>;
