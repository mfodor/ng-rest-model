# NgRestModel Documentation

[Back to the index](README.md)

## RestModel

### Table of contents

- General methods
  - [init](#init)
  - [clear](#clear)
  - [clone](#clone)
  - [primaryValue](#primaryvalue-(field-getter))
  - [postData](#postdata-(field-getter))
  - [plain](#plain)
  - [equals](#equals)
  - [onAfterFill](#onafterfill)
  - [fill](#fill)
  - [addParent](#addparent)
  - [itemsUrl](#itemsurl)
  - [itemUrl](#itemurl)
- REST methods
  - [all](#all)
  - [page](#page)
  - [find](#find)
  - [fresh](#fresh)
  - [create](#create)
  - [update](#update)
  - [save](#save)
  - [remove](#remove)

### Init

`init(obj?: I): this`

Clears the model with the method `clear()` and then fills according to the passed `obj`.
This fill is **not** the `fill(obj)` method so copies every value of `obj` except the
protected fields.

### Clear

`clear(): this`

Sets all **fillable** fields **and the primary key** field to undefined.

### Clone

`clone(): this`

Creates a new instance of the class, initializes it with the current instance, copies
all parents if any as well and then returns the newly created instance.

### primaryValue (field getter)

Returns with the value of the primary key field.

### postData (field getter)

This getter is called whenever a POST or PUT method is called and the result of this
getter will be sent to the server as the payload. By default this returns whatever
`plain()` returns.

### Plain

`plain()`

Creates a simple(r) object by copying every fillable field and the `primaryValue` to
a new object.

### Equals

`equals(other)`

Compares the instance with `other`. Every object is considered as equal which has the
same primary value and all values in the fillable fields are equal.

### All

`all(options?: any): Observable<this[] | any>`

Creates a GET request to load all resources. (e.g. GET /api/users) In case of success
all responded items are mapped: a new instance of the class is constructed with each
item of the responded list.

If the server responds with paging use `page()` instead

### Page

`page(page?: number|string, options?: any): Observable<P>`

Creates a GET request to load a page of all resources. (e.g. GET /api/users?page=2)
In case of success all responded items are mapped: a new instance of the class is
constructed with each item of the responded list. The paging details are returned.

By default the result list is looked up in the field `data`. If the paging response
has a different field name it can be specified by:

```typescript
protected $pagingItemsKey = 'resultSet';
```

### Find

`find(id: number | any, options?: any): Observable<this>`

Creates a GET request to load the specified resource. (e.g. GET /api/users/3242). In case
of success the responded item is mapped to a class instance.

### Fresh

`fresh(options?: any): Observable<this>`

Creates a GET request to load the specified resource. (e.g. GET /api/users/3242). In case
of success the responded item is used to re-init the current instance.

### Create

`create(options?: any): Observable<this>`

Creates a POST request to insert new data. (e.g. POST /api/users). In case of success
the responded item is used to re-init the current instance.

### Update

`update(options?: any): Observable<this>`

Creates a PUT request to update the resource. (e.g. PUT /api/users/3242). In case
of success the responded item is used to re-init the current instance.

### Save

`save(options?: any): Observable<this>`

If the instance has `primaryValue` `update()` is called `create()` otherwise.

### Remove

`remove(options?: any): Observable<this>`

Creates a DELETE request to remove the resource. (e.g. DELETE /api/users/3242).
In case of success the responded item is used to re-init the current instance.

### onAfterFill

`protected onAfterFill(): void`

By default this method does nothing. This method is called after every `fill()`
and `init()`.

### Fill

`fill(obj?: any, clearMissing: boolean = false): this`

Copies all values of `obj` that have **fillable** field name. If `clearMissing`
flag is set to true all fields that are fillable but had no value in `obj` are
set to null.

### addParent

`addParent(parent: RestModel): this`

Sets parent to be a parent of the resource. On URL generation every parent's
`itemUrl()` is appended to the base url before appending the resource's route.

Consider Post{id:428} has a parent: User{id:94}. Calling `post.update()` will
send a request to `PUT /api/users/94/posts/428`.

### itemsUrl

`itemsUrl(): ApiUrlMaker`

Returns with an ApiUrlMaker object prepared with API_BASE_URL, all parent
`itemUrl`s and `$route` (`@Path($route)`).

### itemUrl

`itemUrl(id: number | any = null): ApiUrlMaker`

Same as `itemsUrl()` but appends one more part: the given id or `primaryValue`.
