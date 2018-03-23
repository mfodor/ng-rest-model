# NgRestModel Documentation

[Back to the index](README.md)

## FetchMode

`FetchMode` is an enum like class and has two values:

```typescript
type TFetchMode = 'lazy' | 'eager';

class FetchMode {
    static LAZY: TFetchMode = 'lazy'
    static EAGER: TFetchMode = 'eager'
}
```
