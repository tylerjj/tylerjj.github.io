function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    let sign = 1.0;

    let sliderValue = parseFloat(slider1.value);
    let sliderMax = slider1.max;
    let sliderMin = slider1.min;

    function draw() {
        canvas.width = canvas.width;

        sliderValue = sliderValue + sign;
        if (sliderValue > sliderMax || sliderValue < sliderMin) {
            sign = -1 * sign;
            sliderValue = sliderValue + (sign * 1);
        }
        slider1.value = sliderValue;
        console.log(slider1.value);
        // use the sliders to get the angles
        var tParam = sliderValue * 0.01;

        function moveToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.moveTo(res[0], res[1]); }

        function lineToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.lineTo(res[0], res[1]); }

        function drawObject(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            moveToTx([-.05, -.05], Tx);
            lineToTx([-.05, .05], Tx);
            lineToTx([.05, .05], Tx);
            lineToTx([.05, -.05], Tx);
            context.closePath();
            context.fill();
        }

        function drawAxes100unit(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([120, 0], Tx); lineToTx([0, 0], Tx); lineToTx([0, 120], Tx);
            // Arrowheads
            moveToTx([110, 5], Tx); lineToTx([120, 0], Tx); lineToTx([110, -5], Tx);
            moveToTx([5, 110], Tx); lineToTx([0, 120], Tx); lineToTx([-5, 110], Tx);
            // X-label
            moveToTx([130, 0], Tx); lineToTx([140, 10], Tx);
            moveToTx([130, 10], Tx); lineToTx([140, 0], Tx);
            context.stroke();
        }

        function drawAxes1unit(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([1.20, 0], Tx); lineToTx([0, 0], Tx); lineToTx([0, 1.20], Tx);
            // Arrowheads
            moveToTx([1.10, .05], Tx); lineToTx([1.20, 0], Tx); lineToTx([1.10, -.05], Tx);
            moveToTx([.05, 1.10], Tx); lineToTx([0, 1.20], Tx); lineToTx([-.05, 1.10], Tx);
            // X-label
            moveToTx([1.30, 0], Tx); lineToTx([1.40, .10], Tx);
            moveToTx([1.30, .10], Tx); lineToTx([1.40, 0], Tx);
            context.stroke();
        }


        var Hermite = function (t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t,
                -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        // Christmas Tree
        var p0 = [0, 0];
        var d0 = [0, 0];
        var p1 = [1, 1.75];
        var d1 = [-1, 0];
        var p2 = [2, 0];
        var d2 = [1, -1];
        var p3 = [0, 0];
        var d3 = [1, 1];

        // Nested Candy Corn
        // var p0 = [0, 0];
        // var d0 = [0, 0];
        // var p1 = [1, 3];
        // var d1 = [1, 0];
        // var p2 = [2, 0];
        // var d2 = [0, -1];
        // var p3 = [0, 0];
        // var d3 = [0, 1];

        var P0 = [p0, d0, p1, d1]; // First two points and tangents
        var P1 = [p1, d1, p2, d2]; // Second two points and tangents
        var P2 = [p2, d2, p3, d3]; // Last two points and tangents

        var C0 = function (t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function (t_) { return Cubic(Hermite, P1, t_); };
        var C2 = function (t_) { return Cubic(Hermite, P2, t_); };

        var Ccomp = function (t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1(u);
            } else {
                var u = t - 2.0;
                return C2(u);
            }
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }

        // make sure you understand these    

        drawAxes100unit("black", mat3.create());

        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [50, 350]);
        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [150, -150]); // Flip the Y-axis
        drawAxes1unit("grey", Tblue_to_canvas);

        context.lineWidth = 2;
        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "purple");

        var Tgreen_to_blue1 = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue1, Ccomp(tParam));
        var Tgreen_to_canvas1 = mat3.create();
        mat3.multiply(Tgreen_to_canvas1, Tblue_to_canvas, Tgreen_to_blue1);
        drawObject("green", Tgreen_to_canvas1);

        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [.5, .5]);
        mat3.translate(Tblue_to_canvas, Tblue_to_canvas, [1, 1]);
        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "purple");

        var Tgreen_to_blue2 = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue2, Ccomp(tParam));
        var Tgreen_to_canvas2 = mat3.create();
        mat3.multiply(Tgreen_to_canvas2, Tblue_to_canvas, Tgreen_to_blue2);
        drawObject("green", Tgreen_to_canvas2);

        context.beginPath();
        context.strokeStyle = "black";
        moveToTx([0, 0], Tgreen_to_canvas1);
        lineToTx([0, 0], Tgreen_to_canvas2);
        context.stroke();

        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [.5, .5]);
        mat3.translate(Tblue_to_canvas, Tblue_to_canvas, [1, 1]);
        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "purple");

        var Tgreen_to_blue3 = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue3, Ccomp(tParam));
        var Tgreen_to_canvas3 = mat3.create();
        mat3.multiply(Tgreen_to_canvas3, Tblue_to_canvas, Tgreen_to_blue3);
        drawObject("green", Tgreen_to_canvas3);

        context.beginPath();
        context.strokeStyle = "black";
        moveToTx([0, 0], Tgreen_to_canvas2);
        lineToTx([0, 0], Tgreen_to_canvas3);
        context.stroke();

        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [.5, .5]);
        mat3.translate(Tblue_to_canvas, Tblue_to_canvas, [1, 1]);
        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "purple");

        var Tgreen_to_blue4 = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue4, Ccomp(tParam));
        var Tgreen_to_canvas4 = mat3.create();
        mat3.multiply(Tgreen_to_canvas4, Tblue_to_canvas, Tgreen_to_blue4);
        drawObject("green", Tgreen_to_canvas4);

        context.beginPath();
        context.strokeStyle = "black";
        moveToTx([0, 0], Tgreen_to_canvas3);
        lineToTx([0, 0], Tgreen_to_canvas4);
        context.stroke();

        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [.5, .5]);
        mat3.translate(Tblue_to_canvas, Tblue_to_canvas, [1, 1]);
        var Tgreen_to_blue5 = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue5, Ccomp(tParam));
        var Tgreen_to_canvas5 = mat3.create();
        mat3.multiply(Tgreen_to_canvas5, Tblue_to_canvas, Tgreen_to_blue5);

        context.beginPath();
        context.strokeStyle = "black";
        moveToTx([0, 0], Tgreen_to_canvas4);
        lineToTx([0, 0], Tgreen_to_canvas5);
        context.stroke();
        requestAnimationFrame(draw);

    }

    slider1.addEventListener("input", draw);
    draw();
}
window.onload = setup;