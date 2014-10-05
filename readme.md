<h1 align="center">
obj-map
<br>
<a href="https://travis-ci.org/quarterto/obj-map"><img alt="Build Status" src="https://travis-ci.org/quarterto/obj-map.svg"></a>
</h1>

For mapping objects.

```javascript
objMap({a: 1, b: 2}, function(k, v) {
	return k == 'b' ? v * 2 : v;
}); //⇒ {a: 1, b: 4}

objMap.async({a: 1, b: 2}, function(k, v, cb) {
	cb(null, k == 'b' ? v * 2 : v);
}, console.log); //⇒ {a: 1, b: 4}
```

## api
#### objMap :: ∀ a,b. Object a → (a → b) → Object b
Takes an object and a transformation function and does what you expect.

#### objMap.async :: ∀ a,b. Object a → (a → (Error? → b → ())) → (Error? → Object b → ())
Takes an object and an *asynchronous* transformation function and does what you expect.

## licence
MIT
