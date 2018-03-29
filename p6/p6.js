// p6 1.0
// draw a triangle using WebGL
// based on examples given in class
//
// written by Nik Flahavan on March 22, 2018
function start () {
    "use strict";
    // get the canvas and make an OpenGL context
    // check for errors
    var canvas = document.getElementById("mycanvas");
    if(!canvas){
        alert("No element with id \"mycanvas\"");
        return;
    }
    var gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    // get GLSL code
    // check for errors
    try {
        var vertexSource = document.getElementById("vertexShader").text;
        var fragmentSource = document.getElementById("fragmentShader").text;
    } catch (error) {
        alert("Getting GLSL code.\n" + error);
        return;
    }
    // create the shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
        alert("gl.createShader(shaderType) returned 0.  Error occured while creating shader.");
    }
    // set source code of the shaders.
    // compile the shaders
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("error setting source code of the vertex shader.\n");
        return;
    }
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("error setting source code of the fragment shader.\n");
        return;
    }
    // create shaderProgram
    // attach shaders and link program
    var shaderProgram = gl.createProgram();
    if (!shaderProgram) {
        alert("error, gl.createProgram() returned 0");
        return;
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("error attaching and linking shaders");
      return;
    }

}