// Multiple Animated Circle 
var canvas = document.getElementById("canvas");
// Set Canvas dimensions
canvas.width=window.innerWidth
canvas.height=window.innerHeight
// Set Canvas dimensions
var c4 = canvas.getContext('2d');

// The Circle class
function Circle( x, y, dx, dy, radius ) {

	this.x 	= x;
	this.y 	= y;
	this.dx = dx;
	this.dy = dy;

	this.radius = radius;

	this.draw = function() {

		c4.beginPath();
		c4.arc( this.x, this.y,  this.radius, 0, Math.PI * 2, true  );
		c4.strokeStyle = "#B5373F";
        c4.lineWidth = 2;
        c4.stroke();
	}
	
	var mouseX=0;
	var mouseY=0;
	window.addEventListener('mousemove', function (e) {
		mouseX=e.x;
		mouseY=e.y;
	});

	this.update = function() {

		if(Math.round(this.x) < mouseX+120 && Math.round(this.x) > mouseX-120 &&
			Math.round(this.y) < mouseY+120 && Math.round(this.y) > mouseY-120){
				var xDif=(Math.round(this.x)-mouseX);
				var yDif=(Math.round(this.y)-mouseY);
				
				if(xDif < 60 && xDif > 0){
					this.dx+=0.05;
				}
				else if(xDif < 140 && xDif > 60){
					this.dx+=0.02;
				}	
				else if(xDif > -60 && xDif < 0){
					this.dx-=0.05;
				}
				else if(xDif > -140 && xDif < -60){
					this.dx-=0.02;
				}
				if(yDif < 60 && yDif > 0){
					this.dy+=0.05;
				}
				else if(yDif < 140 && yDif > 60){
					this.dy+=0.02;
				}	
				else if(yDif > -60 && yDif < 0){
					this.dy-=0.05;
				}
				else if(yDif > -140 && yDif < -60){
					this.dy-=0.02;
				}		
		}
		if(this.x + this.radius > 230 && this.x + this.radius < 500 || this.x - this.radius < 0 || this.x - this.radius < canvas.width-210 && this.x + this.radius > 500 || this.x + this.radius > canvas.width) {

			this.dx = -this.dx;
		}

		if(this.y + this.radius > canvas.height || this.y - this.radius < 65) {

			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

        this.draw();
	}
}

var circles = [];
var number = 9;

for( var i = 0; i < number; i++ )  {

	// Radius
	var radius = 50;
	var scaleSize=Math.random();
	if(scaleSize>0.4){
		radius=radius*scaleSize;
	}
	// Starting Position
	if(i<4){
	var x = Math.random() * 100 + radius;
	var y = Math.random() * (canvas.height - radius * 2 - 65) + radius+65;
	}
	else{
		var x = Math.random() * 120 + canvas.width - (100 + radius);
		var y = Math.random() * (canvas.height - radius * 2 - 65) + radius+65;	
	}	
	// Speed in x and y direction
	var dx = 0;
	var xDirection = Math.random();
	if(xDirection<0.5){dx = -1* Math.random() * 0.7;}
  	else{dx = xDirection *  0.7;}
  	var dy = Math.random() *  0.7;


	circles.push( new Circle( x, y, dx, dy, radius ) );
	
}

function animate() {
  
	requestAnimationFrame(animate);

	c4.clearRect( 0, 0, canvas.width, canvas.height );

	for( var r = 0; r < number; r++ ) {

		circles[r].update();
	}
}

animate();


