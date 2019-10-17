let VSHADER_SOURCE =
    'void main(){' +
    'gl_Position = vec4(0.0,0.0,0.0,1.0);' +
    'gl_PointSize = 10.0;' +
    '}';
let FSHADER_SOURCE =
    'void main(){' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}';

function main() {
    let canvas = document.getElementById("example");
    let gl = getWebGLContext(canvas);
    if (!gl) {
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error("failed to init shaders");
        return;
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}