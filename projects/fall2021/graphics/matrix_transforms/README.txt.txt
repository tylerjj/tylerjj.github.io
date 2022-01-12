Author: Tyler Johnston
CS559 HW 03: Matrix Transforms
10/22/21

app.js outline:
This is a rudimentary
copy of my hierachal modeling assignment, except the context transforms have been replaced with matrix transforms. 

Outline:
	drawCircle:
		Original code from HW2. Draws a circle of a specific color.
	drawChainLink:
		Original code from HW2. Draws what appears to be a metal ring.
	moveToTransform:
		Used only in testing out the matrix transforms.
	lineToTransform:
		Used only in testing out the matrix transforms.
	arcTransform:
		Utilized matrix transforms to perform context.arc
	drawCircleTx:
		Utilized arcTransform to accomplish same functionality as drawCircle
	drawChainLinkTx: 
		Utilized arcTransform to accomplish same functionality as drawChainLink
	handleDirectionAndSpeed:
		This is the code that increments/decrements our global position each frame.
