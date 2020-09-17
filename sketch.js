var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(200,350,10,10);
  monkey.addAnimation("running",monkey_running);  
  monkey.scale = 0.1;
  ground = createSprite(300,390,1400,10);
  ground.x = ground.width/2;
  ground.velocityX = -6;
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
if(ground.x<0){
   ground.x = 500;
}
 fruit(); 
 obstacle();
if(keyDown("space")){
   monkey.velocityY = -11;
 }
   monkey.velocityY = monkey.velocityY + 0.8; 
  if(foodGroup.isTouching(monkey)){
   foodGroup.destroyEach();
   score = score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
     gameState = END;
  }
}
  if(gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
}
  
  monkey.collide(ground);
  
  
  drawSprites();  
  fill ("darkgray");
  text("Food Eaten: " +score, 400,200);
}

function fruit(){
  if(frameCount%60 === 0){
    banana = createSprite(600,50,10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.y = Math.round(random(50,100))
    banana.lifetime = 300;
    banana.scale = 0.1;
    foodGroup.add(banana);
 }
  
}

function obstacle(){
  if(frameCount%200 === 0){
   var obstacle = createSprite(600,360,10,10); 
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.lifetime = 100;
   obstacle.scale = 0.15;
   obstacleGroup.add(obstacle);
}
  
  
  
  
  
  
  
  
}



