function setup() {
    let myCanvas = document.getElementById('myCanvas');
    let context = myCanvas.getContext('2d');

    // We use these for tracking movement across the canvas.
    let x = myCanvas.width / 2;
    let y = myCanvas.height / 4;
    let radius = 50;
    let isDirRight = true;
    let isDirDown = true;



    function draw() {

        function moveToTransform(x, y, transform) {
            let result = vec2.create();
            vec2.transformMat3(result, [x, y], transform);
            console.log(result);
            context.moveTo(result[0], result[1]);
        }

        function lineToTransform(x, y, transform) {
            let result = vec2.create();
            vec2.transformMat3(result, [x, y], transform);
            console.log(result);
            context.lineTo(result[0], result[1]);
        }

        function arcTransform(center_x, center_y, radius, starting_radian, ending_radian, transform) {
            let result = vec2.create();
            vec2.transformMat3(result, [center_x, center_y], transform);
            context.arc(result[0], result[1], radius, starting_radian, ending_radian);
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
        function drawCircleTx(color, radius, transform) {
            context.beginPath();
            arcTransform(0, 0, radius, 0, 2 * Math.PI, transform);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
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
        function drawChainLinkTx(transform) {
            context.beginPath();
            arcTransform(0, 0, 15, 0, 2 * Math.PI, transform);
            context.fillStyle = "rgba(255, 255, 255, 0)";
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = 'DarkSlateGrey';
            context.stroke();
        }

        function handleDirectionAndSpeed(speedX, speedY) {
            if (isDirRight) {
                if ((x + radius + 1) > myCanvas.width) {
                    isDirRight = false;
                    //x--;
                    x -= speedX;
                } else {
                    //x++;
                    x += speedX;
                }
            } else {
                if (x - radius - 1 < 0) {
                    isDirRight = true;
                    //x++;
                    x += speedX;
                } else {
                    //x--;
                    x -= speedX;
                }
            }

            if (isDirDown) {
                if ((y + radius + 1 > myCanvas.height)) {
                    isDirDown = false;
                    //y--;
                    y -= speedY;
                } else {
                    //y++;
                    y += speedY;
                }
            } else {
                if ((y - radius - 1) < 0) {
                    isDirDown = true;
                    //y++;
                    y += speedY;
                } else {
                    //y--;
                    y -= speedY;
                }
            }
        }
        function drawMainContent() {
            //Increments or decements x and y depending on current direction.
            handleDirectionAndSpeed(1, 1);

            // Set up the root of our hierarchal object.
            let Tcircle_to_canvas = mat3.create();
            mat3.translate(Tcircle_to_canvas, Tcircle_to_canvas, [x, y]);

            //-------------------- DRAW BOTTOM ARM---------------------------------------------
            let Tchain1_to_circle = mat3.create();
            mat3.rotate(Tchain1_to_circle, Tchain1_to_circle, (x + 45) * Math.PI / 180);
            mat3.translate(Tchain1_to_circle, Tchain1_to_circle, [0, radius * 1.5]);

            let Tchain1_to_canvas = mat3.create();
            mat3.multiply(Tchain1_to_canvas, Tcircle_to_canvas, Tchain1_to_circle);
            drawChainLinkTx(Tchain1_to_canvas);

            let Tchain2_to_chain1 = mat3.create();
            mat3.translate(Tchain2_to_chain1, Tchain2_to_chain1, [0, radius / 2]);

            let Tchain2_to_canvas = mat3.create();
            mat3.multiply(Tchain2_to_canvas, Tchain1_to_canvas, Tchain2_to_chain1);
            drawChainLinkTx(Tchain2_to_canvas);

            let Tchain3_to_chain2 = mat3.create();
            mat3.rotate(Tchain3_to_chain2, Tchain3_to_chain2, (x - 45) * -Math.PI / 180);
            mat3.translate(Tchain3_to_chain2, Tchain3_to_chain2, [0, radius / 2]);

            let Tchain3_to_canvas = mat3.create();
            mat3.multiply(Tchain3_to_canvas, Tchain2_to_canvas, Tchain3_to_chain2);
            drawChainLinkTx(Tchain3_to_canvas);

            let Tchain4_to_chain3 = mat3.create();
            mat3.translate(Tchain4_to_chain3, Tchain4_to_chain3, [0, radius / 2]);

            let Tchain4_to_canvas = mat3.create();
            mat3.multiply(Tchain4_to_canvas, Tchain3_to_canvas, Tchain4_to_chain3);
            drawChainLinkTx(Tchain4_to_canvas);


            let Tchain5_to_chain4 = mat3.create();
            mat3.translate(Tchain5_to_chain4, Tchain5_to_chain4, [0, radius / 2]);

            let Tchain5_to_canvas = mat3.create();
            mat3.multiply(Tchain5_to_canvas, Tchain4_to_canvas, Tchain5_to_chain4);
            drawChainLinkTx(Tchain5_to_canvas);


            let Tball_to_chain5 = mat3.create();
            mat3.translate(Tball_to_chain5, Tball_to_chain5, [0, radius]);
            mat3.scale(Tball_to_chain5, Tball_to_chain5, [.8, .9]);

            let Tball_to_canvas = mat3.create();
            mat3.multiply(Tball_to_canvas, Tchain4_to_canvas, Tball_to_chain5);
            drawCircleTx("black", radius, Tball_to_canvas);

            // ------------------------------DRAW TOP ARM--------------------------------------------
            let Tchain1_to_circle_v2 = mat3.create();
            mat3.rotate(Tchain1_to_circle_v2, Tchain1_to_circle_v2, (x + 45) * -Math.PI / 180);
            mat3.translate(Tchain1_to_circle_v2, Tchain1_to_circle_v2, [0, -radius * 1.5]);

            let Tchain1_to_canvas_v2 = mat3.create();
            mat3.multiply(Tchain1_to_canvas_v2, Tcircle_to_canvas, Tchain1_to_circle_v2);
            drawChainLinkTx(Tchain1_to_canvas_v2);

            let Tchain2_to_chain1_v2 = mat3.create();
            mat3.translate(Tchain2_to_chain1_v2, Tchain2_to_chain1_v2, [0, -radius / 2]);

            let Tchain2_to_canvas_v2 = mat3.create();
            mat3.multiply(Tchain2_to_canvas_v2, Tchain1_to_canvas_v2, Tchain2_to_chain1_v2);
            drawChainLinkTx(Tchain2_to_canvas_v2);

            let Tchain3_to_chain2_v2 = mat3.create();
            mat3.rotate(Tchain3_to_chain2_v2, Tchain3_to_chain2_v2, (x - 45) * Math.PI / 180);
            mat3.translate(Tchain3_to_chain2_v2, Tchain3_to_chain2_v2, [0, radius / 2]);

            let Tchain3_to_canvas_v2 = mat3.create();
            mat3.multiply(Tchain3_to_canvas_v2, Tchain2_to_canvas_v2, Tchain3_to_chain2_v2);
            drawChainLinkTx(Tchain3_to_canvas_v2);

            let Tchain4_to_chain3_v2 = mat3.create();
            mat3.translate(Tchain4_to_chain3_v2, Tchain4_to_chain3_v2, [0, radius / 2]);

            let Tchain4_to_canvas_v2 = mat3.create();
            mat3.multiply(Tchain4_to_canvas_v2, Tchain3_to_canvas_v2, Tchain4_to_chain3_v2);
            drawChainLinkTx(Tchain4_to_canvas_v2);

            let Tchain5_to_chain4_v2 = mat3.create();
            mat3.translate(Tchain5_to_chain4_v2, Tchain5_to_chain4_v2, [0, radius / 2]);

            let Tchain5_to_canvas_v2 = mat3.create();
            mat3.multiply(Tchain5_to_canvas_v2, Tchain4_to_canvas_v2, Tchain5_to_chain4_v2);
            drawChainLinkTx(Tchain5_to_canvas_v2);

            let Tball_to_chain5_v2 = mat3.create();
            mat3.translate(Tball_to_chain5_v2, Tball_to_chain5_v2, [0, radius]);

            let Tball_to_canvas_v2 = mat3.create();
            mat3.multiply(Tball_to_canvas_v2, Tchain4_to_canvas_v2, Tball_to_chain5_v2);
            drawCircleTx("black", radius, Tball_to_canvas_v2);

            //----------------------DRAW BODY OF ROOT------------------------
            drawCircleTx("grey", radius * 1.5, Tcircle_to_canvas);
        }
        myCanvas.width = myCanvas.width;
        drawMainContent();
        requestAnimationFrame(draw);
    }
    draw();
}

window.onload = setup;