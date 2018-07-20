var start = false;

var snake;
var food;
var score;
var multiplier = 20;

//Colors:
var bgColor = 25;
var snakeColor = 255;

function preload() {
	// Ensure the .ttf or .otf font stored in the assets directory
	// is loaded before setup() and draw() are called
	arcadeFont = loadFont('assets/fonts/black.ttf');
	scoreFont = loadFont('assets/fonts/score.ttf');

  }

function setup() {
	createCanvas(600, 600);
	frameRate(20);
	snake = new Snake();
	score = new Score();
	menu = new Menu();
	location();
	menu.turnOnMenuVisibility();
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
		snake.checkIfDead();

		if (snake.eat(food) === true){
			score.points += 1;
			location();
		}

		score.handleScoreDisplaying();

		spawnFood();
	} 

	if(menu.menuVisible){
		menu.handleShowMenu();
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

function mousePressed() {
	menu.clickEvents();
}

class Score {
	constructor(){
		this.points = 0;
		this.highestPoints = 0;
	}

	handleScoreDisplaying(){
		textFont(scoreFont);
		this.displayString();
		this.displayScore();
		this.checkPoints();
	}

	displayString(){
		textSize(18);
		textAlign(LEFT);
		text("Score: ", 0, 0, 15, 15);
		textAlign(RIGHT);
		text("Best-Score: ", 550, 0, 15, 15);
	}

	displayScore(){
		textSize(18);
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

	checkIfDead(){
		for (var i=0; i<this.tail.length-1; i++){
			var distance = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if(distance < 1){
				this.death();
			}
		} 
	}

	death(){
		turnOffGame();
		menu.turnOnMenuVisibility();
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
		this.colors = {
			normal: {fristValue: 255, secondValue: 255, thirdValue: 255},
			highlited: {fristValue: 153, secondValue: 255, thirdValue: 51}
		}
		this.menuObjects = [
			{
				details: ["Menu", 300, 220, 15, 15], color: this.colors.normal, font: 16, align: CENTER 
			},
			{
				details: ["Play", 300, 250, 15, 15], color: this.colors.normal, font: 14, align: CENTER, onClicked: () => this.startGame()
			},
			{
				details: ["Options", 300, 270, 15, 15], color: this.colors.normal, font: 14, align: CENTER
			}
		]
	} 

	handleShowMenu() {
		turnOffGame();
		this.showAllText();
		this.listenToMouseEvents();
	}

	showAllText(){
		this.showMenuTitle();
		this.showPlay();
		this.showOptions();
	}

	turnOffMenuVisibility() {
		this.menuVisible = false;
	}
	
	turnOnMenuVisibility() {
		this.menuVisible = true;
	}

	showMenuTitle() {
		this.showText(this.menuObjects[0].details, this.menuObjects[0].color, this.menuObjects[0].font, this.menuObjects[0].align)
	}

	showPlay() {
		this.showText(this.menuObjects[1].details, this.menuObjects[1].color, this.menuObjects[1].font, this.menuObjects[1].align)
	}

	showOptions() {
		this.showText(this.menuObjects[2].details, this.menuObjects[2].color, this.menuObjects[2].font, this.menuObjects[2].align)
	}

	showText(textDetails, color, size, align) {
		textFont(arcadeFont);
		fill(color.fristValue, color.secondValue, color.thirdValue);
		textSize(size);
		textAlign(align);
		text(...textDetails);
	}

	listenToMouseEvents(){
		this.highliteEvents();
	}

	highliteEvents(){
		for(var i = 1; i < this.menuObjects.length; i++){
			this.checkIfHiglited(this.menuObjects[i]);
		}
	}

	checkIfHiglited(menuObject) {
		if(mouseX > menuObject.details[1] - 50 && mouseX < menuObject.details[1] + 50 && mouseY > menuObject.details[2] - 10 && mouseY < menuObject.details[2] + 10) {
			menuObject.color = this.colors.highlited;
		} else {
			menuObject.color = this.colors.normal;
		}
	}

	clickEvents(){
		for(var i = 1; i < this.menuObjects.length; i++){
			this.checkIfClicked(this.menuObjects[i]);
		}
	}

	checkIfClicked(menuObject) {
		if(mouseX > menuObject.details[1] - 50 && mouseX < menuObject.details[1] + 50 && mouseY > menuObject.details[2] - 10 && mouseY < menuObject.details[2] + 10) {
			menuObject.onClicked();
		} 
	}

	startGame(){
		this.turnOffMenuVisibility();
		snake.reset();
		turnOnGame();
	}
}


function turnOffGame(){
	start = false;
}

function turnOnGame(){
	start = true;
}

function spawnFood(){
	fill(121, 185, 71);
	rect(food.x, food.y, multiplier, multiplier);
}