var trex,ground,clouds,cactuses,gameover,restart,invisibleground;
var score=0
var gamestate="start"
var cloudimg,gameoverimg,groundimg,ob1,ob2,ob3,ob4,ob5,ob6,restartimg,trexrunning,trexcolliding;
function preload(){
cloudimg=loadImage("cloud.png")
groundimg=loadImage("ground2.png")
gameoverimg=loadImage("gameOver.png")
ob1=loadImage("obstacle1.png")
ob2=loadImage("obstacle2.png")
ob3=loadImage("obstacle3.png")  
ob4=loadImage("obstacle4.png")
ob5=loadImage("obstacle5.png") 
ob6=loadImage("obstacle6.png")  
restartimg=loadImage("restart.png")
trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
trexcolliding=loadAnimation("trex_collided.png");}
function setup(){
createCanvas(400,400);
  trex=createSprite(44,318,10,10)
trex.addAnimation("trex",trexrunning)
trex.addAnimation("colliding",trexcolliding)  
trex.scale=0.8

 ground=createSprite(0,380,400,10)
ground.addImage(groundimg)


 invisibleground=createSprite(0,390,400,10)
invisibleground.visible=false
 clouds = createGroup();
 cactuses = createGroup();
 gameover=createSprite(206,169)
gameover.addImage(gameoverimg)
restart=createSprite(201,233)
restart.addImage(restartimg)
gameover.visible=false
restart.visible=false
//trex.debug=true
//trex.setCollider("circle",0,0,30)
}
function draw() {
  background("white");
  drawSprites()
 textSize(20)
 text("score"+score,190,27)
 if (gamestate=="start") {
    
 ground.velocityX=-(6+score/100) 
trex.changeAnimation("trex",trexrunning)   
 score=score+Math.round(frameCount/180)
  if (keyDown("space")&&trex.y>328) {
    trex.velocityY=-10
  }
  if (ground.x<0) {
     ground.x=ground.width/2
  
  }
 cloud();
  cactus();  
if (trex.isTouching(cactuses)) {
trex.changeAnimation("colliding",trexcolliding)
gamestate="end"  
}

   
 }
else if(gamestate=="end"){
  ground.velocityX=0
  trex.velocityX=0
  trex.velocityY=0
cactuses.destroyEach()
clouds.destroyEach()
cactuses.setVelocityXEach(0)
clouds.setVelocityXEach(0)
gameover.visible=true
restart.visible=true
if (mousePressedOver(restart)) {
gamestate="start"
gameover.visible=false
restart.visible=false
score=0
  
}

  
}
 trex.velocityY=trex.velocityY+0.4
 createEdgeSprites();
 trex.collide(invisibleground);

  
}
function cloud(){
if (frameCount%100==0) {
  


  cloud1=createSprite(400,Math.round(random(60,250)),20,20)
  cloud1.addImage(cloudimg)
  cloud1.velocityX=-(6+score/100) 

clouds.add(cloud1);
    
}  
}
function cactus(){
if (frameCount%100==0) {
 cactus1=createSprite(400,360,20,20)
 select=Math.round(random(1,6))
switch(select){
  case 1:cactus1.addImage(ob1);
  break;
 case 2:cactus1.addImage(ob2);
  break; 
   case 3:cactus1.addImage(ob3);
  break;
   case 4:cactus1.addImage(ob4);
  break;
   case 5:cactus1.addImage(ob5);
  break;
   case 6:cactus1.addImage(ob6);
  break;
  default:break;
}
cactus1.scale=0.7
cactus1.velocityX=-(6+score/100) 
cactus1.depth=trex.depth
trex.depth=trex.depth+1
cactuses.add(cactus1);
    
}
}