Author: Tyler Johnston
CS559 HW 03: Matrix Transforms
10/22/21

app.js outline:

I'm only pursuing a 3 for this assignment.
Semester is crazy as we near midterms, so this is a rudimentary
copy of my HW2. 

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

Coming out of this assignment, there are a handful of things that are confusing to me,
particularly the scale transform not working, and fromTranslate vs translate resulting in different
outcomes in my code, such that I removed scale and fromTranslate entirely.

I also have no idea how to use setTransform or manage my own stack, so these will be things I'll have to study up on next week. 


