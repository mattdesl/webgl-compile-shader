var test = require('tape').test;
var compiler = require('./');

var gl = require('webgl-context')();

function doCompile() {
    return compiler({
        gl: gl,
        vertex: "void main() { }",
        fragment: "#ifdef GL_ES\nprecision mediump float;\n#endif\nvoid main() { }"
    });
}

function doCompileErr() {
    return compiler({
        gl: gl,
        vertex: "varying vec2 t;\nvoid main() { }",
        fragment: "a#ifdef GL_ES\nprecision mediump float;\n#endif\nvoid main() { }"
    });
}

test('compiles successfully', function(t) {
    t.doesNotThrow(doCompile, 'compiles without error');
    t.throws(doCompileErr, 'compiles with error');

    //for this we need to use the same GL context!
    t.ok( gl.isProgram(doCompile().program), 'return value is a WebGLProgram object' );
    t.end();
});