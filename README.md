[![browser support](https://ci.testling.com/mattdesl/webgl-compile-shader.png)](https://ci.testling.com/mattdesl/webgl-compile-shader)

# webgl-compile-shader 
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Compiles a WebGL shader program from the given vertex and fragment source. Throws an error on failure, providing clear logging with line numbers and the problematic shader (vertex vs. fragment). 

The shaders are detached and flagged for deletion after linking.

## Usage

```js
var compiler = require('webgl-compile-shader');
var info = compile({
	vertex: vertSource,
	fragment: fragSource,

	//optional args
	gl: gl, //WebGL context; if not specified a new one will be created
	verbose: true, //whether to emit console.warn messages when throwing errors
	attributeLocations: { ... key:index pairs ... },
});

//for dealing with the WebGL object
var program = info.program;
//for dealing with logging/warnings 
var log = info.log;
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/webgl-compile-shader/blob/master/LICENSE.md) for details.
