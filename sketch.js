var dog, dogImg,happyDogImg, database, foodS, foodStock;
var feedBtn, addFoodBtn,fedTime, lastFed,foodObj;

function preload()
{
 
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
 
}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();
  dog = createSprite(250,250)
  dog.addImage("dog",dogImg)
  dog.addImage("doghappy",happyDogImg)
  dog.scale = 0.2;
  getFoodStock();
  
feedBtn = createButton("Feed Dog")
feedBtn.position(300,300)

addFoodBtn = createButton("add Food")
addFoodBtn.position(100,300)
  
 foodObj= new Food()
  
}


function draw() {  

  background(46, 139, 87);
  fill("red")
  stroke("white")
  text("Press UP ARROW TO FEED DOG", 150, 50);

  foodObj.foodStock = foodS;
  foodObj.display();
  database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
    showTime(lastFed);
  });
    
 addFoodBtn.mousePressed(function(){
   getFoodStock()
   addFood(foodS)
 })
  
 feedBtn.mousePressed(function(){
    getFoodStock()
    feedDog()
 })
    
  
  drawSprites();
  

}


function showTime(time){
  if(time>=12){
    text("last fed:"+time%12+"pm",350,300)
  }
  else if(time===0){
    text("last fed:"+"12am",350,300)
  }
  else{
    text("last fed:"+time+"am",350,300)
  }
}

function addFood(f){
  f++;
  database.ref('/').update({
    Food : f
  })
}
function getFoodStock(){
  database.ref("Food").on("value",function(data){
    foodS = data.val();
  })
}
function feedDog(){
  foodS--
  database.ref("/").update({
    FeedTime:hour(),
    Food:foodS
  })
}
