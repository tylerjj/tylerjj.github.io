// https://github.com/sifakis/CS559F21_Demos/blob/main/Week2/Demo1/demo.js
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

function drawSky() {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "DeepSkyBlue";
    context.fill();
    context.stroke();
}

function drawGround() {
    context.beginPath();
    context.rect(0, (canvas.height / 2) + 40, canvas.width, canvas.height);
    context.fillStyle = "ForestGreen";
    context.fill();
    context.stroke();
}

function drawBody(centerX, centerY) {
    // https://stackoverflow.com/questions/25095548/how-to-draw-a-circle-in-html5-canvas-using-javascript
    context.beginPath();
    context.arc(centerX, centerY, 50, 0, 2 * Math.PI, false);
    context.fillStyle = 'pink';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
}
function drawEyes(centerX, centerY) {
    // https://stackoverflow.com/questions/25095548/how-to-draw-a-circle-in-html5-canvas-using-javascript
    context.beginPath();
    context.ellipse(centerX - 15, centerY - 15, 20, 10, Math.PI / 2, Math.PI * 2
        , 0, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX - 15, centerY - 30, 5, 5, Math.PI / 2, Math.PI * 2, 0, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX + 15, centerY - 15, 20, 10, Math.PI / 2, Math.PI * 2, 0, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX + 15, centerY - 30, 5, 5, Math.PI / 2, Math.PI * 2, 0, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
}
function drawBlush(centerX, centerY) {
    context.beginPath();
    context.ellipse(centerX - 30, centerY + 15, 10, 5, 0, Math.PI * 2
        , 0, false);
    context.fillStyle = '#E75480';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "dark pink";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX + 30, centerY + 15, 10, 5, 0, Math.PI * 2, 0, false);
    context.fillStyle = '#E75480';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "dark pink";
    context.stroke();
}

function drawMouth(centerX, centerY) {
    context.beginPath();
    context.arc(centerX, centerY + 20, Math.PI * 2, Math.PI, 0, true);
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
}
function drawArms(centerX, centerY, rotation) {
    // rotation starts off Math.pi/4
    context.beginPath();
    context.ellipse(centerX - 60, centerY, 20, 10, -rotation, Math.PI * 2, 0, false);
    context.fillStyle = "pink";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX + 60, centerY, 20, 10, rotation, Math.PI * 2, 0, false);
    context.fillStyle = "pink";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
}
function drawFeet(centerX, centerY, rotation) {
    // rotation starts off math.pi/6
    context.beginPath();
    context.ellipse(centerX - 25, centerY + 55, 25, 10, -rotation, Math.PI * 2, 0, false);
    context.fillStyle = "#E75480";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(centerX + 25, centerY + 55, 25, 10, rotation, Math.PI * 2, 0, false);
    context.fillStyle = "#E75480";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
}
function drawKirby(centerX, centerY, armRotation, feetRotation) {
    drawArms(centerX, centerY, armRotation);
    drawFeet(centerX, centerY, feetRotation);
    drawBody(centerX, centerY);
    drawEyes(centerX, centerY);
    drawBlush(centerX, centerY);
    drawMouth(centerX, centerY);
}

drawSky();
drawGround();

let centerX = (canvas.width) / 2;
let centerY = (canvas.width) / 2;
let armRotation = Math.PI / 4;
let feetRotation = Math.PI / 6;
drawKirby(centerX, centerY, armRotation, feetRotation);

let slider = document.querySelector("#slider");
function draw() {
    canvas.width = canvas.width;
    drawSky();
    drawGround();
    switch (parseInt(slider.value)) {
        case (0):
            centerX = (canvas.width) / 2;
            centerY = (canvas.width) / 2;
            armRotation = Math.PI / 4;
            feetRotation = Math.PI / 6;
            break;
        case (1):
            centerX = (canvas.width) / 2;
            centerY = (canvas.width) / 2 - 10;
            armRotation = Math.PI / 6;
            feetRotation = Math.PI / 5;
            break;
        case (2):
            centerX = (canvas.width) / 2;
            centerY = (canvas.width) / 2 - 20;
            armRotation = Math.PI / 8;
            feetRotation = Math.PI / 4;
            break;
        case (3):
            centerX = (canvas.width) / 2;
            centerY = (canvas.width) / 2 - 30;
            armRotation = Math.PI / 10;
            feetRotation = Math.PI / 3;
            break;
        case (4):
            centerX = (canvas.width) / 2;
            centerY = (canvas.width) / 2 - 40;
            armRotation = Math.PI / 12;
            feetRotation = Math.PI / 2;
            break;
        default:
            console.log(slider.value);
    }
    drawKirby(centerX, centerY, armRotation, feetRotation);
}
slider.addEventListener("input", draw);