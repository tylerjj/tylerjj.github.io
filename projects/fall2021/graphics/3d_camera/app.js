// This assignment is heavily influenced by all the Week 7 Demos,
// including https://jsbin.com/waqeyocoqa/edit?js,output

function setup() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var slider2 = document.getElementById('slider2');
	slider2.value = 75;

	function draw() {
		canvas.width = canvas.width;

		// use the sliders to get the angles
		var viewAngle = slider2.value * 0.02 * Math.PI;

		function moveToTx(loc, Tx) { var res = vec3.create(); vec3.transformMat4(res, loc, Tx); context.moveTo(res[0], res[1]); }

		function lineToTx(loc, Tx) { var res = vec3.create(); vec3.transformMat4(res, loc, Tx); context.lineTo(res[0], res[1]); }

		function drawAxes(color, Tx) {
			context.strokeStyle = color;
			context.beginPath();
			// Axes
			moveToTx([120, 0, 0], Tx); lineToTx([0, 0, 0], Tx); lineToTx([0, 120, 0], Tx);
			// Arrowheads
			moveToTx([110, 5, 0], Tx); lineToTx([120, 0, 0], Tx); lineToTx([110, -5, 0], Tx);
			moveToTx([5, 110, 0], Tx); lineToTx([0, 120, 0], Tx); lineToTx([-5, 110, 0], Tx);
			// X-label
			moveToTx([130, 0, 0], Tx); lineToTx([140, 10, 0], Tx);
			moveToTx([130, 10, 0], Tx); lineToTx([140, 0, 0], Tx);
			context.stroke();
		}

		function Cspiral(Rstart, Rslope, t) {
			var R = Rslope * t + Rstart;
			var x = R * Math.cos(2.0 * Math.PI * t);
			var y = Rslope * t;
			var z = R * Math.sin(2.0 * Math.PI * t);
			return [x, y, z];
		}

		var Para0 = function (t_) { return Cspiral(100, 0, t_); };
		var Para1 = function (t_) { return Cspiral(150, 0, t_); };
		var Para2 = function (t_) { return Cspiral(200, 75, t_); };

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

		var CameraCurve = function (angle) {
			var locCamera = vec3.create();
			var distCamera = 800.0;
			locCamera[0] = 100;
			locCamera[1] = distCamera * Math.sin(angle);
			locCamera[2] = distCamera * Math.cos(angle);
			return [locCamera[0], locCamera[1], locCamera[2]];
		}
		// make sure you understand these    
		drawAxes("black", mat4.create());

		/** The Start of LookAt Prep Stuff **/

		// Creating the camera (lookat) transform
		var eyeCamera = CameraCurve(viewAngle);
		// Aim at the origin of the world coordinates
		var targetCamera = vec3.fromValues(0, 0, 0);
		// Y axis of world coordinates to be vertical
		var upCamera = vec3.fromValues(0, 1, -15);
		var TlookAtCamera = mat4.create();
		mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
		/** The End of LookAt Prep Stuff  **/

		/** The Start of the ViewPort Prep Stuff **/

		// Let TViewport be our viewport transform
		var Tviewport = mat4.create();
		// Move the center of the "lookAt" transform (where the camera points)
		// to the canvas coordinates (200, 300).
		mat4.fromTranslation(Tviewport, [200, 200, 0]);
		// Flip the Y-Axis 
		mat4.scale(Tviewport, Tviewport, [1, -1, -1]);
		/** The End of the ViewPort Prep Stuff **/

		/** The Start of the Projection Stuff **/

		// Create projection transform
		var Tprojection = mat4.create();
		//mat4.ortho(Tprojection, -1, 1, -1, 1, -1, 1);
		mat4.perspective(Tprojection, Math.PI / 500, 1, 0, 100);
		var tVP_PROJ = mat4.create();
		mat4.multiply(tVP_PROJ, Tviewport, Tprojection);
		/** The End of the Projection Stuff  **/


		// Create transform tVP_Cam that applies the 
		// lookAt transform to our viewport projection
		var tVP_CAM = mat4.create();
		mat4.multiply(tVP_CAM, tVP_PROJ, TlookAtCamera);
		drawAxes("grey", tVP_CAM);

		context.lineWidth = 2;

		drawTrajectory(0.0, 3, 5, Para0, tVP_CAM, "red");
		drawTrajectory(1, 2, 4, Para1, tVP_CAM, "blue");

		mat4.translate(tVP_CAM, tVP_CAM, [0, 50, 0]);
		mat4.scale(tVP_CAM, tVP_CAM, [2, 2, 2]);
		drawTrajectory(0.0, 3, 5, Para0, tVP_CAM, "green");
		drawTrajectory(1, 2, 4, Para1, tVP_CAM, "blue");


		mat4.scale(tVP_CAM, tVP_CAM, [.5, .5, .5]);
		mat4.translate(tVP_CAM, tVP_CAM, [0, -100, 0]);
		mat4.scale(tVP_CAM, tVP_CAM, [2, 2, 2]);
		drawTrajectory(0.0, 3, 5, Para0, tVP_CAM, "green");
		drawTrajectory(1, 2, 4, Para1, tVP_CAM, "blue");
		drawTrajectory(0, 3, 300, Para2, tVP_CAM, "purple");
	}
	slider2.addEventListener("input", draw);
	draw();
}
window.onload = setup;