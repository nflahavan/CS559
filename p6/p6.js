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
    if(canvas == null){
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
    var vertexSource = document.getElementById("vertexShader").text;
    if(vertexSource == null){
        alert("No element with id \"vertexShader\"");
        return;
    }
    var fragmentSource = document.getElementById("fragmentShader").text;
    if(fragmentSource == null){
        alert("No element with id \"fragmentShader\"");
        return;
    }

    // compile the vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
}