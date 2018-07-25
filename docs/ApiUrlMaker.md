# NgRestModel Documentation

[Back to the index](README.md)

## ApiUrlMaker

Basically this class is not necessary to be used but if someone overwrites a method of
the base class `RestModel` or if creates function that uses the inherited http field.

```typescript
  public fetchImage() {
    return this.http.get(this.itemUrl().all('image').build());
  }
```

The concept of `ApiUrlMaker` comes from the `Restangular` library. A RESTful URL is
theoretically constructed like this: `collection[/key]([/collection[/key]])*`.
This class helps to build such URLs however it does not required to have this pattern.
The following is absolutely valid:

```typescript
new ApiUrlMaker().all('users').all(289342983).all('posts')
``` 

### one(collection: string | number, key: string | number): ApiUrlMaker

Adds two parts to the path to be constructed. Ideally a collection name and a key.

### all(collection: string | number): ApiUrlMaker

Adds one key to the path to be constructed. Ideally a collection name.

### params(params: {\[key: string]: number | string}): ApiUrlMaker

Adds the specified params to the params to be constructed.

### param(key: string | number, value: string | number): ApiUrlMaker

Adds the specified param to the params to be constructed.

### build(): string

Constructs the URL string.

```typescript
const maker = new ApiUrlMaker('/api')
    .one('users', 289342983)
    .all('posts')
    .params({year: 2018})
    .param('filter', 'police');

// /api/users/289342983/posts?year=2018&filter=police
console.log(maker.build());
```
