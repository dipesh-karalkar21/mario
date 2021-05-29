var bg,bgImage;
var mario_running, mario_collide,mario;
var brickGroup,brickImage;
function preload(){
    mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
    brickImage=loadImage("images/brick.png");
}

function setup() {
createCanvas(1000, 600);
bg=createSprite(580,300);
bg.addImage(bgImage);
bg.scale=0.5;
bg.velocityX=-6;
mario=createSprite(200,505,20,50);
mario.addAnimation("running",mario_running);
mario.scale=0.3;
ground=createSprite(200,585,400,10);
ground.visible=false;
//group for bricks
brickGroup=new Group();
}


function draw() {
    if(keyDown("space")){
        mario.velocityY=-16;

    }
    if(bg.x<200){
        bg.x=bg.width/4
    }
    mario.velocityY=mario.velocityY+0.5;
    mario.collide(ground);
    console.log(frameCount);
    //call the brick function
    generateBricks();
    //mario collide with bricks
    for(var i=0;i<(brickGroup).length;i++){
        var temp=(brickGroup).get(i);
        if(temp.isTouching(mario)){
            mario.collide(temp);
        }
    }
    //avoid mario being pushed away
    if(mario.x<200){
        mario.x=200;
    }
    //stop mario from going out of the screen
    if(mario.y<50){
        mario.y=50;
    }
drawSprites();

}
//infinite no. of bricks
function generateBricks(){
    if(frameCount%70==0){
        var brick=createSprite(1200,120,40,10);
    brick.y=random(50,450);
    brick.velocityX=-5;
    brick.addImage(brickImage);
    brick.scale=0.5;
    brick.lifetime=250;
    brickGroup.add(brick);
    }
    


}