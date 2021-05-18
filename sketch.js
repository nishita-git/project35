var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
 
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showErr);
 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    //write code to move air balloon in left direction
    updateHeight(-3,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.002
    
  }
  else if(keyDown(RIGHT_ARROW)){
    //write code to move air balloon in right direction
    updateHeight(3,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.002
    
  }
  else if(keyDown(UP_ARROW)){
    //write code to move air balloon in up direction
    updateHeight(0,-3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.003
   
  }
  else if(keyDown(DOWN_ARROW)){
    //write code to move air balloon in down direction
    updateHeight(0,3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.002
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
database.ref('balloon/height').set({
  x:balloon.x+x,
  y:balloon.y+y
})
}
function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showErr(){
  console.log("Error in writing to the database");
}