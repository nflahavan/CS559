// p6 1.0
// draw a triangle using WebGL
// based on examples given in class
//
// written by Nik Flahavan on March 22, 2018
function start () {
    "use strict";
    //
    //
    //
    //
    // prep twgl vars.  check for errors (CFE)? as of right now no.
    var p6 = p6Data;
    var m4 = twgl.m4;
    var v3 = twgl.v3;
    // Get the canvas and make an OpenGL context. Get the sliders. CFE.
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    if(!canvas || !gl || !slider1 || !slider2){
        alert("error prepping canvas and sliders");
        return;
    }
    slider1.value = 0;
    slider2.value = 0;
    // get GLSL code. CFE.
    try {
        var vertexSource = document.getElementById("vertexShader").text;
        var fragmentSource = document.getElementById("fragmentShader").text;
    } catch (error) {
        alert("Getting GLSL code.\n" + error);
        return;
    }
    // create the shaders. CFE.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
        alert("gl.createShader(shaderType) returned 0.  Error occured while creating shader.");
    }
    // set source code of the shaders. Compile shaders and CFE.
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
    // create shaderProgram. Attach shaders, link program and CFE.
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
    gl.useProgram(shaderProgram);
    //
    // compute normals
    computeNormalVectors(p6Data.indices);
    // compute normalMatrix
    //
    // set up attribute/matrix communication
    var indexOfAttributes = new Array(p6Data.attributes.length);
    var attributeBuffers = new Array(indexOfAttributes.length);
    setUpAttributeCommunication();

    // this gives us access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, p6Data.indices, gl.STATIC_DRAW);   

    // ready for draw loop.
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();

    function computeNormalVectors (triangles) {
        // get the coordinates
        var coordinates = p6Data.attributes[0].buffer;
        for (var i=0; i < triangles.length; i+=9) {
            // get the points
            var point1 = v3.create(coordinates[i],coordinates[i+1],coordinates[i+2]);
            var point2 = v3.create(coordinates[i+3],coordinates[i+4],coordinates[i+5]);
            var point3 = v3.create(coordinates[i+6],coordinates[i+7],coordinates[i+8]);
            // compute the normal
            var vector1 = v3.subtract(point1,point2);
            var vector2 = v3.subtract(point1,point3);
            var normalVector = v3.normalize(v3.cross(vector1,vector2));
            p6Data.attributes[2].buffer.push(normalVector);
            p6Data.attributes[2].buffer.push(normalVector);
            p6Data.attributes[2].buffer.push(normalVector);
        }
    }
    function setUpAttributeCommunication() {
        for (var i = 0; i < indexOfAttributes.length; i++) {
            indexOfAttributes[i] = gl.getAttribLocation(shaderProgram, p6Data.attributes[i].name);
            if(indexOfAttributes[i] == -1) {
                alert("error getting attribute location.");
                return;
            }
            gl.enableVertexAttribArray(indexOfAttributes[i]);
            if(gl.getError() != gl.NO_ERROR) {
                alert("error enabling attribute");
                return;
            }
            attributeBuffers[i] = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffers[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p6Data.attributes[i].buffer), gl.STATIC_DRAW);
        }
    } 
    function draw() {
        // translate slider values.
        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;
        // set up matrix vars.
        var eye = [400*Math.sin(angle1),150.0,400.0*Math.cos(angle1)];
        var target = [0,0,0];
        var up = [0,1,0];
        // prep matrix.  Using Teacher's matrices for now...
        var tModel1 = m4.multiply(m4.scaling([100,100,100]),m4.axisRotation([1,1,1],angle2));
        var tCamera = m4.inverse(m4.lookAt(eye,target,up));
        var tProjection = m4.perspective(Math.PI/3,1,10,1000);
        var tMVP=m4.multiply(m4.multiply(tModel1,tCamera),tProjection);
        // ready to draw
        // first, let's clear the screen
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // set up uniforms and attributes
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
	    
        try {
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffers[0]);
            gl.vertexAttribPointer(indexOfAttributes[0], /*itemsize*/3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffers[1]);
            gl.vertexAttribPointer(indexOfAttributes[1], /*itemsize*/3,gl.FLOAT,false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.drawElements(gl.TRIANGLES, p6Data.indices.length, gl.UNSIGNED_BYTE, 0);
        } catch (error) {
            alert(error);
            return;
        }

    }
}