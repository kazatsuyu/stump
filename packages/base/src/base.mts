// A marker for under constructing.
/** @deprecated A marker for under constructing.*/
export type ToDo = never;

type A = ToDo;

export type Normalize<T> = {
  [K in keyof T]: T[K];
};

export type Extends<T, U> = T extends U ? true : false;
export type Not<T extends boolean> = Extends<T, false>;

export type ToString<T extends string | number | bigint | boolean | undefined | null> = `${T}`;
export type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never;
export type ToBigint<T extends string> = T extends `${infer U extends bigint}` ? U : never;
