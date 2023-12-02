export type Sign<T extends string> = T extends `-${string}` ? '-' : '+';

export type Abs<T extends string> = T extends `-${infer U}` ? U : T;

export type Inv<T extends string> = T extends '0' ? '0' : T extends `-${infer U}` ? U : `-${T}`;
