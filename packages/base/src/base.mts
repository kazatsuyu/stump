/**
 * @ignore
 *
 * @deprecated A marker for under constructing.
 */
export type ToDo = never;

/**
 * @category Base
 *
 * @template {unknown} T
 *
 * @template {unknown} U
 *
 * @description
 * If `T` extends `U`, returns `true`. Otherwise returns `false`.
 *
 * @example
 * ```ts
 * type A = [Extends<42, number>, Extends<number, 42>];
 * //   ^?
 * //     type A = [true, false]
 * ```
 */
export type Extends<T, U> = T extends U ? true : false;

/**
 * @category Base
 *
 * @template {boolean} T
 *
 * @description
 * If `T` is `false`, returns `true`. Otherwise returns `false`.
 *
 * Note that if `T` is `boolean` (`true | false`), returns `false`.
 *
 * @example
 * ```ts
 * type A = [Not<true>, Not<false>, Not<boolean>];
 * //   ^?
 * //     type A = [false, true, false]
 * ```
 */
export type Not<T extends boolean> = Extends<T, false>;

export type Primitive = string | number | bigint | boolean | undefined | null;

export type AltUnknown = Primitive | symbol | {};

/**
 * @category Base
 *
 * @template {Primitive} T
 *
 * @description
 * Convert `T` to `string`.
 *
 * @example
 * ```ts
 * type A = [
 *   // ^?
 *   //   type A = ["🪵", "42", "100", "true", "false", "undefined", "null"]
 *   ToString<'🪵'>,
 *   ToString<42>,
 *   ToString<100n>,
 *   ToString<true>,
 *   ToString<false>,
 *   ToString<undefined>,
 *   ToString<null>,
 * ];
 * ```
 */
export type ToString<T extends Primitive> = `${T}`;

export type AnyToString<T> = T extends symbol ? never : T extends Primitive ? `${T}` : string;

/**
 * @category Base
 *
 * @template {unknown} T
 *
 * @description
 * If `T` is number-like string(`${number}`), convert to `number`. Otherwise returns `never`.
 *
 * @example
 * ```ts
 * type A = [ToNumber<'42'>, ToNumber<'0.1'>, ToNumber<'🪵'>];
 * //   ^?
 * //     type A = [42, 0.1, never]
 * ```
 */
export type ToNumber<T> = T extends `${infer U extends number}` ? U : never;

/**
 * @category Base
 *
 * @template {unknown} T
 *
 * @description
 * If `T` is bigint-like string(`${bigint}`), convert to `bigint`. Otherwise returns `never`.
 *
 * @example
 * ```ts
 * type A = [ToBigint<'42'>, ToBigint<'0.1'>, ToBigint<'🪵'>];
 * //   ^?
 * //     type A = [42n, never, never]
 * ```
 */
export type ToBigint<T> = T extends `${infer U extends bigint}` ? U : never;

export type Readonly<T> = T extends readonly unknown[] ? readonly [...T] : globalThis.Readonly<T>;
