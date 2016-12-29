var snake;
var multiplier = 20;
var food;
var score;



function setup() {
	createCanvas(600, 600);
	frameRate(20);
	snake = new Snake();
	score = new Score();
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
	snake.death();
	console.log(snake.x);
	console.log(snake.y);

	if (snake.eat(food) === true){
		score.points += 1;
		location();
	}
	score.displayString();

	score.displayScore();

	fill(144, 0, 150);
	rect(food.x, food.y, multiplier, multiplier);

}

function keyPressed() {
	if (snake.size === 0) {

		if (keyCode === UP_ARROW) {
			snake.direction(0, -1);			
		} 	else if (keyCode === DOWN_ARROW) {
				snake.direction(0, 1)
		}	else if (keyCode === LEFT_ARROW) {
				snake.direction(-1, 0)
		}	else if (keyCode === RIGHT_ARROW) {
				snake.direction(1, 0)
		}		
	} else {
		if (keyCode === UP_ARROW) {
			if (snake.yspeed !== 1) {
				snake.direction(0, -1);	
			} else {
				return;	
			}
		} 	else if (keyCode === DOWN_ARROW) {
				if (snake.yspeed !== -1){
					snake.direction(0, 1);
			} else {
				return;
			}
		}	else if (keyCode === LEFT_ARROW) {
				if(snake.xspeed !== 1){
					snake.direction(-1, 0)					
				} else {
					return;
				}
		}	else if (keyCode === RIGHT_ARROW) {
				if(snake.xspeed !== -1){
					snake.direction(1, 0);
				} else {
					return;
				}
		}		
	}

}

function Score(){
	this.points = 0;

	this.displayString = function(){
		textSize(10);
		text("Score: ", 550, 0, 15, 15);
	}

	this.displayScore = function(){
		textSize(10);
		text(this.points , 585, 0, 15, 15);
	}
}

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;

	this.size = 0;
	this.tail = [];

	this.update = function(){
		if (this.tail.length === this.size){
			for (var i=0; i<this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1];				
			}			
		}

		this.tail[this.size-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed * multiplier;
		this.y = this.y + this.yspeed * multiplier;

		this.x = constrain(this.x, 0, width-multiplier);
		this.y = constrain(this.y, 0, height-multiplier);

	}

	this.show = function(){
		fill(255);
		for (var i=0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, multiplier, multiplier);
		}
		rect(this.x, this.y, multiplier, multiplier);

	}

	this.death = function(){
		for (var i=0; i<this.tail.length-1; i++){
			var distance = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if(distance < 1){
				this.reset();
			}
		} 
	}

	this.reset = function(){
		this.size = 0;
		this.tail = [];
		this.x=0;
		this.y=0;
		score.points = 0;
		location();	
		redraw();
	}

	this.direction = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(cords){
		var distance = dist(this.x, this.y, cords.x, cords.y);

		if (distance<1) {
			this.size += 1;
			return true;
		} else {
			return false;
		}
	}
}
