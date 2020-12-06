var ground , invisibleGround;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;
var score;
var survivalTime;
var gameState = 1 , Play = 1 , End = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  monkey = createSprite(80,405,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  
  
  ground = createSprite(300,450,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  survivalTime = 0;
  
  invisibleGround = createSprite(300,455,1200,10);
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {

  createCanvas(600,500);
  
 

if(gameState === Play){
  if(keyDown("space")&& monkey.y >= 400){
    monkey.velocityY = -17;
  }
   monkey.velocityY = monkey.velocityY + 0.5;
  
   survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,300,50);
  
  //To make the ground move
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(fruitGroup.isTouching(monkey)){
    fruitGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
   gameState = End;
  }  
}
  else if(gameState === End){
     monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    text("Survival Time : " + survivalTime,300,50);
    
  }
  
  invisibleGround.visible = false;
  monkey.collide(invisibleGround);
  
  Enemy();
  Banana();
  drawSprites();
  
}

function Banana(){
  if(frameCount%150 === 0){
    banana = createSprite(650,250,10,10);
    banana.addAnimation("fruit",bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.lifetime = 150,
    fruitGroup.add(banana);
  } 
}

function Enemy(){
  if(frameCount%270 === 0){
    obstacle = createSprite(650,430,10,10);
    obstacle.addAnimation("rock",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
    obstacle.velocityX = -6;
    
    obstacleGroup.add(obstacle);
  } 
}



