var tower, towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage,ghostjumpImage;
var invisibleblock,invisibleBlockGroup;
var gameState = "play";
var spookySound;

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  ghostjumpImage = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200.200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImage);
  
}

function draw(){
  background = ("black");
  if(gameState === "play"){
    
  
  if(keyDown("space")){
    ghost.velocityY = -5;
    ghost.addImage("ghoostjump",ghostjumpImage);
  }
  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }
  ghost.velocityY = ghost.velocityY + 0.1;
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  doors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
    
  }
  drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("red");
    textSize(30);
    text("GAME OVER",230,250);
  }
}

function doors(){
  if(frameCount%240 === 0){
    door = createSprite(300,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(300,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    
    invisibleblock = createSprite(300,15);
    invisibleblock.width = climber.width;
    invisibleblock.visible = false;
    invisibleblock.height = 2;
    invisibleblock.x = climber.x;
    invisibleblock.velocityY = 2;
    invisibleblock.lifetime = 800;
    invisibleBlockGroup.add(invisibleblock);
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
  }
}