var getGL = require('./getGL');

module.exports = function(opts) {
    if (!opts || (!opts.vertex || !opts.fragment))
        throw "must specify vertex and fragment source";
    var vertSource = (opts.vertex).trim();
    var fragSource = (opts.fragment).trim();

    var verbose = opts.verbose;

    var gl = opts.gl;
    if (!gl) {
        gl = getGL(opts);
    }
    return compile(gl, vertSource, fragSource, verbose);
};

//Compiles the shaders, throwing an error if the program was invalid.
function compile(gl, vertSource, fragSource, verbose) {
    var vertShader = loadShader(gl, gl.VERTEX_SHADER, vertSource, verbose);
    var fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource, verbose);

    var program = gl.createProgram();

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program); 

    var log = gl.getProgramInfoLog(program) || "";
    if (verbose && log) {
        console.warn(log);
    }

    gl.detachShader(program, vertShader);
    gl.detachShader(program, fragShader);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw "Error linking the shader program:\n" + log+"\nVERTEX_SHADER:\n"
                +addLineNumbers(vertSource) +"\n\nFRAGMENT_SHADER:\n"
                +addLineNumbers(fragSource);
    }
    return program;
}

function loadShader(gl, type, source, verbose) {
    var shader = gl.createShader(type);
    if (!shader) //should not occur...
        return -1;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    //we do this so the user knows which shader has the error
    var typeStr = (type === gl.VERTEX_SHADER) ? "vertex" : "fragment";

    var logResult = gl.getShaderInfoLog(shader) || "";
    if (logResult) {
        logResult = "Error compiling "+ typeStr+ " shader:\n"+logResult+"\n"+addLineNumbers(source);
    }

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
        throw logResult;
    }
    if (!shader)
        throw "gl.createShader returned 0 for "+typeStr+" shader";
    if (verbose && logResult)
        console.warn(logResult);
    return shader;
}



function addLineNumbers( string ) {
    var lines = string.split( '\n' );
    for ( var i = 0; i < lines.length; i ++ ) {
        lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
    }
    return lines.join( '\n' );
}