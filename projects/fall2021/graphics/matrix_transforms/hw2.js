function setup() {
    let myCanvas = document.querySelector("#myCanvas");
    let context = myCanvas.getContext("2d");
    //https://stackoverflow.com/questions/25095548/how-to-draw-a-circle-in-html5-canvas-using-javascript
    let x = myCanvas.width / 2;
    let y = myCanvas.height / 4;
    let radius = 50;
    let isDirRight = true;
    let isDirDown = true;

    function drawBackground() {
        function drawSky() {
            context.beginPath();
            context.rect(0, 0, myCanvas.width, myCanvas.height);
            context.fillStyle = "DeepSkyBlue";
            context.fill();
            context.stroke();
        }

        function drawGround() {
            context.beginPath();
            context.rect(0, (myCanvas.height / 2) + 140, myCanvas.width, myCanvas.height);
            context.fillStyle = "ForestGreen";
            context.fill();
            context.stroke();

            drawTree(myCanvas.width / 8, myCanvas.height / 3, 35, 300);
            drawTree(myCanvas.width / 3, myCanvas.height / 3, 35, 300);
            drawTree(myCanvas.width / 1.5, myCanvas.height / 3, 35, 300);
            drawTree(myCanvas.width / 1.1, myCanvas.height / 3, 35, 300);
            drawTree(myCanvas.width / 4, myCanvas.height / 2, 35, 300);
            drawTree(myCanvas.width / 2, myCanvas.height / 2, 35, 300);
            drawTree(myCanvas.width / 1.25, myCanvas.height / 2, 35, 300);
        }
        drawSky();
        drawGround();
    }
    function drawCircle(color, radius) {
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function drawEggman() {
        // Draw Head
        context.beginPath();
        context.arc(0, 0, 60, 2 * Math.PI, false);
        context.fillStyle = "Grey";
        context.fill();
        context.lineWidth = .5;
        context.strokeStyle = "black";
        context.stroke();

        //Draw Eyes
        context.beginPath();
        context.save();
        context.translate(-25, -10);
        context.scale(1, 2);
        context.arc(0, 0, 10, 0, Math.PI + (Math.PI * 2) / 2, true);
        context.fillStyle = "DarkSlateGrey";
        context.fill();
        context.stroke();

        context.beginPath();
        context.arc(0, 0, 4, 0, Math.PI * 2, false);
        context.fillStyle = "gold";
        context.fill();
        context.stroke();
        context.restore();

        context.beginPath();
        context.save();
        context.translate(25, -10);
        context.scale(1, 2);
        context.arc(0, 0, 10, 0, Math.PI + (Math.PI * 2) / 2, true);
        context.fillStyle = "DarkSlateGrey";
        context.fill();
        context.stroke();

        context.beginPath();
        context.arc(0, 0, 4, 0, Math.PI * 2, false);
        context.fillStyle = "gold";
        context.fill();
        context.stroke();
        context.restore();

        // Mouth
        context.beginPath();
        context.strokeStyle = "black"
        context.lineWidth = 1;
        context.fillStyle = "CadetBlue";
        context.moveTo(-50, 0);
        context.lineTo(50, 0);
        context.lineTo(60, 10);
        context.lineTo(-60, 10);
        context.closePath();
        context.fill();
        context.stroke();

        // Mustache
        context.beginPath();
        context.strokeStyle = "Black";
        context.lineWidth = 7;
        context.moveTo(0, 0);
        context.lineTo(-60, 0);
        context.lineTo(-65, -10);
        context.moveTo(-60, 0);
        context.lineTo(-70, 0);
        context.moveTo(-60, 0);
        context.lineTo(-65, 10);

        context.moveTo(0, 0);
        context.lineTo(60, 0);
        context.lineTo(65, -10);
        context.moveTo(60, 0);
        context.lineTo(70, 0);
        context.moveTo(60, 0);
        context.lineTo(65, 10);
        context.stroke();

        context.beginPath();
        context.strokeStyle = "DodgerBlue";
        context.lineWidth = 6;
        context.moveTo(0, 0);
        context.lineTo(-60, 0);
        context.lineTo(-65, -10);
        context.moveTo(-60, 0);
        context.lineTo(-70, 0);
        context.moveTo(-60, 0);
        context.lineTo(-65, 10);

        context.moveTo(0, 0);
        context.lineTo(60, 0);
        context.lineTo(65, -10);
        context.moveTo(60, 0);
        context.lineTo(70, 0);
        context.moveTo(60, 0);
        context.lineTo(65, 10);
        context.stroke();


        // Nose
        context.beginPath();
        context.strokeStyle = "black"
        context.lineWidth = 1;
        context.fillStyle = "Red";
        context.moveTo(0, -5);
        context.lineTo(-10, 10);
        context.lineTo(10, 10);
        context.closePath();
        context.fill();
        context.stroke();

    }
    function drawChainLink() {
        context.beginPath();
        context.arc(0, 0, 15, 0, 2 * Math.PI, false);
        context.fillStyle = "rgba(255, 255, 255, 0)";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'DarkSlateGrey';
        context.stroke();
    }
    function drawLine(x, y, newX, newY) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function drawEggChain() {
        if (isDirRight) {
            if ((x + radius + 1) > myCanvas.width) {
                isDirRight = false;
                x--;
            } else {
                x++;
            }
        } else {
            if (x - radius - 1 < 0) {
                isDirRight = true;
                x++;
            } else {
                x--;
            }
        }

        if (isDirDown) {
            if ((y + radius + 1 > myCanvas.height)) {
                isDirDown = false;
                y--;
            } else {
                y++;
            }
        } else {
            if ((y - radius - 1) < 0) {
                isDirDown = true;
                y++;
            } else {
                y--;
            }
        }

        context.translate(x, y);
        context.save();

        // Draw a chain at the bottom of where our
        // central ball will be (ball drawn at end).
        context.translate(0, 60);
        drawChainLink();

        // Draw a chain link connecting to the previous
        // link.
        // This link going to rotate itself and its children 
        // each frame.
        context.rotate((45 + x) * Math.PI / 180);
        context.translate(0, 25);
        drawChainLink();

        context.translate(0, 25);
        drawChainLink();

        context.rotate((45 + x) * Math.PI / 180);
        context.translate(0, 25);
        drawChainLink();

        context.translate(0, 25);
        drawChainLink();

        context.translate(0, 25);
        drawChainLink();

        context.translate(0, 25);
        drawChainLink();

        // Draw the outer ball that is connected 
        // at the end of the chain.
        context.translate(0, 25);
        drawEggman();

        // Restore context back to the root object.
        context.restore();
        context.save();

        // Draw a chain link at the top of the root object.
        context.translate(0, -60);
        drawChainLink();

        // Like before, we connect this chain link to 
        // the previous chain link.
        // This link will rotate itself and its children each
        // frame.
        context.rotate(1 * (45 + x) * Math.PI / 180);
        context.translate(0, -25);
        drawChainLink();

        context.translate(0, -25);
        drawChainLink();

        context.translate(0, -25);
        drawChainLink();

        context.rotate(1 * (45 + x) * Math.PI / 180);
        context.translate(0, -25);
        drawChainLink();

        context.translate(0, -25);
        drawChainLink();

        context.translate(0, -25);
        drawChainLink();

        // Draw a ball at the end of the chain.
        context.translate(0, -25);
        drawEggman();

        // Restore context back to the root object.
        context.restore();
        // Draw our central ball at the root of the object.
        drawEggman();
    }

    function drawTree(startX, startY, width, height) {

        function drawBase(stX, stY, w, h) {
            let startX = stX;
            let startY = stY;

            let height = h;
            let width = w;
            context.beginPath();
            context.rect(startX, startY, width, height);
            context.fillStyle = "BurlyWood";
            context.fill();
            for (let i = 0; i < 5; i++) {
                context.moveTo(startX, startY + height / i);
                context.lineTo(startX + width, startY + height / i);
            }
            context.stroke();
        }

        function drawLeaf(stX, stY) {
            let startX = stX;
            let startY = stY;

            let height = 100;
            let width = 25;

            let leafTipHeight = 30;
            context.beginPath();
            context.rect(startX, startY, width, height);
            context.fillStyle = "DarkGreen";
            context.fill();
            context.moveTo(startX, startY + height);
            context.lineTo(startX + (width / 2), startY + height + leafTipHeight);
            context.lineTo(startX + width, startY + height);
            context.closePath();
            context.fill();
            context.stroke();
        }
        context.save();
        context.translate(startX, startY);
        drawBase(0, 0, width, height);
        context.save()
        context.translate(width / 2, 0);

        context.save();
        context.rotate(30 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(60 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(90 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(120 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(150 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(-30 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(-60 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(-90 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(-120 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.save();
        context.rotate(-150 * Math.PI / 180);
        drawLeaf(0, 0);
        context.restore();

        context.restore();
        context.restore();
    }

    function draw() {
        myCanvas.width = myCanvas.width;
        drawBackground();
        drawEggChain();
        requestAnimationFrame(draw);
    }
    draw();
}
window.onload = setup;


