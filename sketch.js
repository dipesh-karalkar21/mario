var bg,bgImage;
var mario_running, mario_collide,mario,marioJump;
var brickGroup,brickImage;
var coinGroup,coinImage,coinScore=0;
var coinSound;
function preload(){
    mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
    brickImage=loadImage("images/brick.png");
    coinSound=loadSound("sounds/coinSound.mp3");
    marioJump=loadSound("sounds/jump.mp3");
    coinImage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
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
//group of coins
coinGroup=new Group();
}


function draw() {
    if(keyDown("space")){
        mario.velocityY=-16;
        marioJump.play();

    }
    if(bg.x<200){
        bg.x=bg.width/4
    }
    mario.velocityY=mario.velocityY+0.5;
    mario.collide(ground);
    //call the brick function
    generateBricks();
    //mario collide with bricks
    for(var i=0;i<(brickGroup).length;i++){
        var temp=(brickGroup).get(i);
        if(temp.isTouching(mario)){
            mario.collide(temp);
        }
    }
    //infinite coins
    generateCoins();
    //catch the coins
    for(var i=0;i<coinGroup.length;i++){
        var temp=coinGroup.get(i);
        if(temp.isTouching(mario)){
            coinSound.play();
            temp.destroy();
            temp=null;
            coinScore++;

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
strokeWeight(20);
stroke("green");
fill("White");
text("Total Coins Collected="+coinScore,140,100);
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

//infinite no. of coins
function generateCoins(){
    if(frameCount%50===0){
        var coin=createSprite(1200,120,40,10);
        coin.addAnimation("coin",coinImage);
        coin.y=random(80,350);
        coin.velocityX=-5;
        coin.scale=0.1;
        coin.lifetime=1200;
        coinGroup.add(coin);
    }
}