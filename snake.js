var snake;
var multiplier = 20;
var food;



function setup() {
	createCanvas(600, 600);
	frameRate(20);
	snake = new Snake();
	location();
}

function location() {
	var columns = floor(width/multiplier);
	var rows = floor(height/multiplier);
	food = createVector(floor(random(columns)), floor(random(rows)));

	food.mult(multiplier);
	
}

function draw() {
	background(25);
	snake.update();
	snake.show();

	if (snake.eat(food) === true){
		location();
	}


	fill(144, 0, 150);
	rect(food.x, food.y, multiplier, multiplier);

}

function keyPressed() {
	if (keyCode === UP_ARROW) {
			snake.direction(0, -1)
	} 	else if (keyCode === DOWN_ARROW) {
			snake.direction(0, 1)
	}	else if (keyCode === LEFT_ARROW) {
			snake.direction(-1, 0)
	}	else if (keyCode === RIGHT_ARROW) {
			snake.direction(1, 0)
	}
}

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;


	this.update = function(){
		this.x = this.x + this.xspeed * multiplier;
		this.y = this.y + this.yspeed * multiplier;

		this.x = constrain(this.x, 0, width-multiplier);
		this.y = constrain(this.y, 0, height-multiplier);

	}

	this.show = function(){
		fill(255);
		rect(this.x, this.y, multiplier, multiplier);
	}

	this.direction = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(cords){
		var distance = dist(this.x, this.y, cords.x, cords.y);

		if (distance<1) {
			return true;
		} else {
			return false;
		}
	}
}
