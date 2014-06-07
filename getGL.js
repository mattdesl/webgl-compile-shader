//could be pulled out to webgl-context
module.exports = function(opts) {
    opts = opts||{};
    var canvas = opts.canvas || document.createElement("canvas");
    var attribs = opts.attribs || {};
    try {
        gl = (canvas.getContext('webgl', attribs) || canvas.getContext('experimental-webgl', attribs));
    } catch (e) {
        gl = null;
    }   
    if (!gl) {
        throw "WebGL Context Not Supported -- try enabling it or using a different browser";
    }
    return gl;
};