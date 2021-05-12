var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed
var fedtime


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  fedtime = database.ref("FeedTime")
  fedtime.on("value", function (data) {
    lastFed = data.val()
  })

  fill("blue")
  textSize(16)

  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
  drawSprites();
}


function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);
var foodStockref=foodObj.getFoodStock()
if(foodStockref<=0){
 foodObj.updateFoodStock(foodStockref*0) 
}else{
 foodObj.updateFoodStock(foodStockref-1) 
}
database.ref("/").update({
 Food:foodObj.getFoodStock(),
 FeedTime:hour() 
})
  
}


function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
