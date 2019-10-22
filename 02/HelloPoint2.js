let VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'attribute float a_PointSize;' +
    'void main(){' +
    'gl_Position = a_Position;' +
    'gl_PointSize = a_PointSize;' +
    '}';

let FSHADER_SOURCE =
    'precision mediump float;' +
    'uniform vec4 u_FragColor;' +
    'void main(){' +
    'gl_FragColor = u_FragColor;' +
    '}';

let g_points = [];
let g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = -((y - rect.top) - canvas.height / 2) / (canvas.height / 2);
    g_points.push([x, y]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (x >= 0 && y >= 0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x < 0 && y < 0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    let len = g_points.length;
    for (let i = 0; i < len; i++) {
        let xy = g_points[i];
        let rgb = g_colors[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0);
        gl.uniform4f(u_FragColor, rgb[0], rgb[1], rgb[2], 1);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

function main() {
    let canvas = document.getElementById("webgl");
    let gl = getWebGLContext(canvas);
    if (!gl) {
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
    let a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_PointSize < 0) {
        console.error("fail get locaition of a_PointSize");
        return;
    }
    let u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };

    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}