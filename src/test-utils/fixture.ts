import deepExtend from "deep-extend";

export type ExtendableObjectFixture<T extends S, S extends object = T> = {
  (changeset: DeepPartial<S>): ExtendableObjectFixture<T>;
  use: () => T;
};

export type ExtendableLiteralFixture<T extends string | number | boolean> = {
  (value: LiteralSuperType<T>): ExtendableLiteralFixture<T>;
  use: () => T;
};

export const fixture = {
  /**
   * @description
   * Creates a fixture for an object that does not need all properties of the original type
   * while still keeping the original type.
   * To extend the fixture with more properties use the returned function.
   * To get the value of the fixture use the `.use()` method.
   * @example
   * type MyEntity = { foo: 1, bar: 2, baz?: 3 }
   * const myEntityFixture = fixture.extendable<MyEntity>({ foo: 1 })
   * const myMoreSpecificEntityFixture = myEntityFixture({ bar: 2 })
   * vi.mocked(getMyEntity).mockReturnValue(myMoreSpecificEntityFixture.use())
   */
  object: function <T extends S, S extends object = T>(
    content: DeepPartial<S> | DeepPartial<T>
  ): ExtendableObjectFixture<T, S> {
    const extend = (changeset: DeepPartial<S>) =>
      fixture.object<T>(deepExtend({} as DeepPartial<T>, content, changeset));

    return Object.assign(extend, {
      use: () => Object.freeze(content as unknown as T),
    });
  },
  /**
   * Allows literal values to have other values than the original literal type.
   * @example
   * type MyEntityId = 'id1' | 'id2'
   * const myEntityIdFixture = fixture.literal<MyEntityId>('someTestId').use()
   * const myOtherEntityIdFixture = myEntityIdFixture('someOtherTestId').use()
   */
  literal: function <T extends string | number | boolean>(
    value: LiteralSuperType<T>
  ): ExtendableLiteralFixture<T> {
    const extend = (newValue: LiteralSuperType<T>) =>
      fixture.literal<T>(newValue);

    return Object.assign(extend, {
      use: () => value as unknown as T,
    });
  },
};

/**
 * @example
 * type SomeStringLiteralType = LiteralSuperType<'foo'> // string
 * type SomeNumberLiteralType = LiteralSuperType<911> // string
 * type SomeBooleanLiteralType = LiteralSuperType<true> // string
 * type SomeMixedLiteralType = LiteralSuperType<'foo' | 911> // string | number
 */
type LiteralSuperType<T extends string | number | boolean> = T extends string
  ? string
  : T extends boolean
  ? boolean
  : T extends number
  ? number
  : never;

export type DeepPartial<T> = {
  [P in KeysOfUnion<T>]?: PickTypesForKeyInUnionObjectType<
    T,
    P
  > extends unknown[]
    ? DeepPartial<PickTypesForKeyInUnionObjectType<T, P>[number]>[]
    : PickTypesForKeyInUnionObjectType<T, P> extends object | undefined
    ? DeepPartial<PickTypesForKeyInUnionObjectType<T, P>>
    : PickTypesForKeyInUnionObjectType<T, P>;
};

/**
 * @example
 * type SomeType = PickTypesForKeyInUnionObjectType<{foo: 1} | {foo: 2} | {bar:1}, 'foo'> // 1 | 2 | undefined
 */
type PickTypesForKeyInUnionObjectType<T, K extends KeysOfUnion<T>> = T extends {
  [k in K]?: unknown;
}
  ? T[K]
  : undefined;

/**
 * @example
 * type MyKeys = KeysOfUnion<{foo: 1} | {bar: 2}> // 'foo' | 'bar'
 */
type KeysOfUnion<T> = T extends T ? keyof T : never;
