var getGL = require('./getGL');

module.exports = function(opts) {
    if (!opts || (!opts.vertex || !opts.fragment))
        throw "must specify vertex and fragment source";
    var vertSource = (opts.vertex).trim();
    var fragSource = (opts.fragment).trim();


    var gl = opts.gl;
    if (!gl) {
        gl = getGL(opts);
    }
    return compile(gl, vertSource, fragSource);
};

//Compiles the shaders, throwing an error if the program was invalid.
function compile(gl, vertSource, fragSource) {
    var log = "";

    var vert = loadShader(gl, gl.VERTEX_SHADER, vertSource);
    var frag = loadShader(gl, gl.FRAGMENT_SHADER, fragSource);

    var vertShader = vert.shader;
    var fragShader = frag.shader;

    log += vert.log + "\n" + frag.log;

    var program = gl.createProgram();

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program); 

    log += gl.getProgramInfoLog(program) || "";
    
    gl.detachShader(program, vertShader);
    gl.detachShader(program, fragShader);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error("Error linking the shader program:\n" + log+"\nVERTEX_SHADER:\n"
                +addLineNumbers(vertSource) +"\n\nFRAGMENT_SHADER:\n"
                +addLineNumbers(fragSource));
    }
    return {
        program: program,
        log: log.trim()
    };
}

function loadShader(gl, type, source) {
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
        throw new Error(logResult);
    }
    if (!shader)
        throw new Error("gl.createShader returned 0 for "+typeStr+" shader.\n"+logResult);
    return {
        shader: shader,
        log: logResult
    };
}

function addLineNumbers( string ) {
    var lines = string.split( '\n' );
    for ( var i = 0; i < lines.length; i ++ ) {
        lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
    }
    return lines.join( '\n' );
}