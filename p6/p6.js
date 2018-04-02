// p6 1.0
// draw a triangle using WebGL
// based on examples given in class
//
// written by Nik Flahavan on March 22, 2018
function start () {
    "use strict";
    // get the canvas and make an OpenGL context
    // get the sliders
    // check for errors
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    if(!canvas || !gl || !slider1 || !slider2){
        alert("error prepping canvas and sliders");
        return;
    }
    // prep twgl vars
    // check for errors? as of right now no.
    var m4 = twgl.m4;
    var v3 = twgl.v3;
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
    // set up attribute communication
    var posAttributeIndex = gl.getAttribLocation(shaderProgram, "pos");
    if(posAttributeIndex == -1) {
        alert("error getting attribute location.");
        return;
    }
    gl.enableVertexAttribArray(posAttributeIndex);
    if(gl.getError() != gl.NO_ERROR) {
        alert("error enabling attribute");
        return;
    }
    // vertex positions in object space
    var vertexPos = [
        0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0,  -1.0, 0.0
    ]
    // put vertices into a buffer
    // so that they can be block transferred to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    try {
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPos), gl.STATIC_DRAW);
    } catch (error) {
        alert("error binding buffer.  only one target can be bound to a given buffer.  a buffer marked for deletion cannot be rebound.  both operations will result in an INVALID_OPERATION exeption being thrown.");
        return;
    }

    draw();
    function draw() {
        // ready to draw
        // first, let's clear the screen
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        try {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        } catch (error) {
            alert("error clearing.  mask is not one of the listed possible values");
            return;
        }
        // now we draw the triangle
        // we tell GL what program to use, and what memory block
        // to use for the data, and that the data goes to the pos
        // attribute
        gl.useProgram(shaderProgram);	    
        try {
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
            gl.vertexAttribPointer(posAttributeIndex, /*itemsize*/3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, /*numitems*/3);
        } catch (error) {
            alert(error);
            return;
        }
    }
}