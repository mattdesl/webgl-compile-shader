# webgl-compile-shader 
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Compiles a WebGL shader program from the given vertex and fragment source. Throws an error on failure, providing clear logging with line numbers and the problematic shader (vertex vs. fragment). 

The shaders are *not* detached/deleted after link, as this was causing issues with Chrome's WebGLInspector.

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
//vert and frag shader GL objects are also exported
console.log(info.vertex, info.fragment);
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/webgl-compile-shader/blob/master/LICENSE.md) for details.
