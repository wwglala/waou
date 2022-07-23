## Function Programming

### curry

```ts
const demo = curry((a, b, c) => {
  console.log(a, b, c);
});

// demo(1,2,3)
// demo(1)(2,3)
// demo(1,2)(3)
```
