var p6Data = new Object();
p6Data.attributes = [["vPos", [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,
                                1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,
                                1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,
                                -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,
                                -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
                                1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 
                             ]
                    ],
                    ["vColors", [0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
                                1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
                                0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
                                1, 1, 0,   1, 1, 0,   1, 1, 0,   1, 1, 0,
                                1, 0, 1,   1, 0, 1,   1, 0, 1,   1, 0, 1,
                                0, 1, 1,   0, 1, 1,   0, 1, 1,   0, 1, 1
                                ]
                    ]];
p6Data.uniforms = ["uMVP"];
p6Data.indices = new Uint8Array(
    [  0, 1, 2,   0, 2, 3,    // front
       4, 5, 6,   4, 6, 7,    // right
       8, 9,10,   8,10,11,    // top
      12,13,14,  12,14,15,    // left
      16,17,18,  16,18,19,    // bottom
      20,21,22,  20,22,23 ]); // back