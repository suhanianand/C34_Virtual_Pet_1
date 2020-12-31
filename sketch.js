//Create variables here
var db;
var dog,foodStock;

function preload()
{
  //load images here
  dogImage1= loadImage("dogImg.png");
  dogImage2= loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  db= firebase.database();
  dog= createSprite(400,350);
  dog.addImage(dogImage1);
  dog.scale= 0.5;
  db.ref('food').on("value",function(data){
    foodStock= data.val()
  })
}

function draw() {
background(46, 139, 87);
if(foodStock){
  fill("black");
  text("foodStock:" + foodStock, 370,70);  
  text("Note: Press UP_ARROW to feed the dog", 300,30); 

}

  drawSprites();
  //add styles here

}

function keyPressed(){
  if(keyCode===UP_ARROW && foodStock!== "undefined"){
dog.addImage(dogImage2);
foodStock= foodStock-1;
db.ref('/').update({food: foodStock})
  }
}

function readStock(data){
  foodStock= data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  } 
  else{
    x= x-1
  }

  db.ref('/').update({
    food:x
  })
}