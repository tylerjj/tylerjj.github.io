Author: Tyler Johnston
CS559 HW 02: Hierarchal Modeling
10/07/21

app.js outline:


drawCircle()
	- Used in proof of concept only.
drawLine()
	- Used in proof of concept only.

drawBackground()
	- Draws the sky, ground, and trees.

drawEggman()
	- Draws a ball with a robot face.

drawChainLink()
	- Draws a single chain link.

*** drawEggChain() ***
	- Increments/decrements a global x,y value which is used
	each frame as the starting translation for the root of the
	parent object. This is what makes the object bounce around
	the screen.
	- We save our context with (x,y) as our new origin.
	- Our root object is going to be an Eggman(ball) in the center.
	- Our two children will then be two chain links, one on top, one on bottom.
	- Each chain link will have several subsequent chain link children, 
	some of which will rotate themselves and their children each frame.
	- At the end of each chain sequence will be an Eggman(ball). 
	

With respect to other code, this was largely done just by looking at the robotic arm 
demo and trying to work my way from the ground up with a moving circle that had children
connected to it. I can tell that visually my homework has similarities with the quad-copter
demo, but I want to be clear that I never opened the source code for that demo. My code is
my own. 

The requestAnimationFrame usage I utilized from the course readings.