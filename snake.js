var start = true;

var snake;
var food;
var score;
var multiplier = 20;

//Colors:
var bgColor = 25;
var snakeColor = 255;



function setup() {
	createCanvas(600, 600);
	frameRate(20);
	snake = new Snake();
	score = new Score();
	menu = new Menu();
	location();
}

function location() {
	var columns = floor(width/multiplier);
	var rows = floor(height/multiplier);
	food = createVector(floor(random(columns)), floor(random(rows)));
	food.mult(multiplier);
	
}


function draw() {
	background(bgColor);

	if(start === true){
		snake.update();
		snake.show();
		snake.death();

		if (snake.eat(food) === true){
			score.points += 1;
			location();
		}
		score.displayString();
		score.displayScore();
		score.checkPoints();
		menu.showMenuTitle();

		fill(121, 185, 71);
		rect(food.x, food.y, multiplier, multiplier);
	} else {
		//startGame();
	}
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

class Score {
	constructor(){
		this.points = 0;
		this.highestPoints = 0;
	}

	displayString(){
		textSize(10);
		text("Score: ", 550, 0, 15, 15);
		text("Best-Score: ", 0, 0, 15, 15);
	}

	displayScore(){
		textSize(10);
		text(this.points , 585, 0, 15, 15);
		text(this.highestPoints, 55, 0, 15, 15);
	}

	checkPoints(){
		if (this.points > this.highestPoints){
			this.highestPoints = this.points;
		}
	}
}

class Snake {
	constructor(){
		this.x = 0;
		this.y = 0;
		this.xspeed = 1;
		this.yspeed = 0;
	
		this.size = 0;
		this.tail = [];
	}


	update(){
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

	show(){
		fill(snakeColor);
		for (var i=0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, multiplier, multiplier);
		}
		rect(this.x, this.y, multiplier, multiplier);

	}

	death(){
		for (var i=0; i<this.tail.length-1; i++){
			var distance = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if(distance < 1){
				this.reset();
			}
		} 
	}

	reset(){
		this.size = 0;
		this.tail = [];
		this.x=0;
		this.y=0;
		score.points = 0;
		location();	
		redraw();
	}

	direction(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	eat(cords){
		var distance = dist(this.x, this.y, cords.x, cords.y);

		if (distance<1) {
			this.size += 1;
			return true;
		} else {
			return false;
		}
	}
}

class Menu {
	constructor(){
		this.menuVisible = false;
		this.menuObjects = [
			[
				"Menu", 300, 220, 15, 15
			],
			[
				"Play", 300, 250, 15, 15
			],
			[
				"Options", 300, 270, 15, 15
			]
		]
	} 

	handleShowMenu() {
		pauseGame();
		this.showMenu();
	}

	hideMenu() {
		menuVisible = false;
	}
	
	showMenu() {
		menuVisible = true;
	}

	showMenuTitle() {
		textAlign(CENTER);
		textSize(16);
		text(...this.menuObjects[0]);
		text(...this.menuObjects[1]);
		text(...this.menuObjects[2]);
	}
}


function pauseGame(){
	start = false;
}

function startGame(){
	start = true;
}

