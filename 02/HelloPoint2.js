let VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'void main(){' +
    'gl_Position = a_Position;' +
    'gl_PointSize = 10.0;' +
    '}';

let FSHADER_SOURCE =
    'void main(){' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}';

function main() {
    let canvas = document.getElementById("webgl");
    let gl = getWebGLContext(canvas);
    if(!gl){
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error("初始化失败");
        return;
    }
    let a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.error("fail get locaition of a_position");
        return;
    }
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}