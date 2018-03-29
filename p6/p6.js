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
        alert(error);
        return;
    }
    // compile the vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
}