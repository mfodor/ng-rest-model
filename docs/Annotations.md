# NgRestModel Documentation

[Back to the index](README.md)

## Table of contents

- [Annotations on class](#annotations-on-class)
  - [@Path](#@path)
  - [@HasMany](#@hasmany)
  - [@BelongsTo](#@belongsto)
- [Annotations on field](#annotations-on-field)
  - [@PrimaryKey](#@primarykey)
  - [@Column](#@column)
  - [@Fillable](#@fillable)
  - [@Protected](#@protected)

## Annotations on class

### @Path

Sets the base path of the resource. Can include `/` so this is absolutely
valid: `namespace/collection`

Example: `@Path('users')` will cause these endpoints to be called:

- GET {API_BASE}/users
- GET {API_BASE}/users/:userId
- POST {API_BASE}/users
- PUT {API_BASE}/users/:userId
- DELETE {API_BASE}/users/:userId

If annotations are not preferred you can 'override' `$route` field:

```typescript
class User extends RestModel {
    protected $route = 'users';
}
```

### @HasMany

Can be called with parameters or with a configuration object.

When `fetch` is set to `FetchMode.LAZY` async will be `true` even if a `false` value is passed.
When `fetch` is set to `FetchMode.EAGER` async will be `false` by default.

```typescript
interface HasManyConfig<T = any> {
    field: string;
    route?: string;
    type: RestModel;
    fetch?: TFetchMode;
    async?: boolean; // if fetch is LAZY async has no effect
}

// These two annotations are equivalent

@HasMany('roles', Role, FetchMode.EAGER, 'roles', false)
class User extends RestModel<User> {}

@HasMany({
    field: 'roles',
    route: 'roles',
    type: Role,
    fetch: FetchMode.EAGER,
    async: false
})
class User extends RestModel<User> {}
```

### @BelongsTo

Very similar to `@HasMany`. Can be called with parameters or with a configuration object.

```typescript
interface BelongsToConfig<T = any> {
    field: string;
    route?: string;
    type: RestModel;
    fetch?: TFetchMode;
    async?: boolean; // if fetch is LAZY async has no effect
}

// These two annotations are equivalent

@BelongsTo('roles', Role, FetchMode.EAGER, 'roles', false)
class User extends RestModel<User> {}

@BelongsTo({
    field: 'roles',
    route: 'roles',
    type: Role,
    fetch: FetchMode.EAGER,
    async: false
})
class User extends RestModel<User> {}
```

## Annotations on field

### @PrimaryKey

By default the primary key is `id`. So it has no real effect if placed on a field
named `id` but may still worth to make all fields annotated.
However if the ID field is named differently it should be annotated.

```typescript
class User extends RestModel {
    @PrimaryKey()
    userId: number;
}
```

If annotations are not preferred you can 'override' `$primaryKey` field:

```typescript
class User extends RestModel {
    userId: number;
    
    protected $primaryKey = 'userId';
}
```

### @Column

In case you want to map a field you should use `@Column`. It will map the field when
arriving from the server and will map back when sending to the server.

```typescript
@Path('posts')
class Post extends RestModel<Post> {

    @Column('user_id')
    userId: number;

}
```

If annotations are not preferred you can 'override' `$mappings` field:

```typescript
class Post extends RestModel {
    userId: number;
    
    protected $mappings = {userId: 'user_id'};
}
```

### @Fillable

**Fillable**: `RestModel.fill(obj)` will overwrite only those fields that are fillable
and are not protected. `RestModel.init(obj)` will copy **EVERY** field of `obj` to the
`RestModel` instance except the protected fields.

If no fields are annotated with `@Fillable` **EVERYTHING** is fillable that `Object.keys()`
returns (except the protected fields);
While if at least one field is marked as `@Fillable` only those fields are fillable.

```typescript
@Path('posts')
class Post extends RestModel<Post> {

    @Fillable()
    title: string;

    @Fillable()
    text: string;

}
```

If annotations are not preferred you can 'override' `$fillable` field:

```typescript
class Post extends RestModel {
    title: string;
    text: string;
    
    protected $fillable = ['title', 'text'];
}
```

### @Protected

**Protected**: Fields marked with `@Protected` are always protected from being filled
since it takes priority over `fillable` but are not write protected. The `@PrimaryKey`
field is also protected.

```typescript
@Path('posts')
class Post extends RestModel<Post> {

    @Protected()
    @Column('created_at')
    createdAt: number;

}
```

If annotations are not preferred you can 'override' `$protected` field:

```typescript
class Post extends RestModel {
    @Column('created_at')
    createdAt: string;
    
    protected $protected = ['createdAt'];
}
```
