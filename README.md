[![browser support](https://ci.testling.com/mattdesl/webgl-compile-shader.png)](https://ci.testling.com/mattdesl/webgl-compile-shader)

# webgl-compile-shader [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Compiles a WebGL shader program from the given vertex and fragment source. Throws an error on failure, providing clear logging with line numbers and the problematic shader (vertex vs. fragment). 

The shaders are detached and flagged for deletion after linking.

## Usage

[![NPM](https://nodei.co/npm/webgl-compile-shader.png)](https://nodei.co/npm/webgl-compile-shader/)

```js
var compiler = require('webgl-compile-shader');
var program = compile({
	gl: gl, //optional WebGL context, otherwise creates a dummy context
	vertex: vertSource,
	fragment: fragSource,
	verbose: true, //spit out console warnings, default false
});
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/webgl-compile-shader/blob/master/LICENSE.md) for details.
