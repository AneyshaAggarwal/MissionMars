var bg2;
var bg;
var mars;
var asteroid1;
var asteroid2;
var fueltank;
var rocket;
var bullet;
var UFO;
var selectAsteroid;
var score= 0;
var fuelLeft= 5;
var gameState= "start";

function preload()
{
 bgImage= loadImage("bg.png");
 bg2Image= loadImage("bg2.jpeg")
 ast1= loadImage("ASTEROID1.png");
 ast2= loadImage("ASTEROID2.png");
 rocketImage= loadImage("ROCKET.png");
 bulletImage= loadImage("BULLET.png");
 ft= loadImage("FUELTANK.png");
 UFOing= loadImage("UFO.png");
 marsImg= loadImage("MARS.png");
}

function setup()  
{
  createCanvas(700, 700);

  //background
  bg = createSprite(0, 300, 500, 500);
  bg.addImage(bgImage);
  bg.scale= 2;
  bg.velocityY= 5;

  //rocket
  rocket = createSprite(350, 640, 20, 50);
  rocket.addImage(rocketImage);
  rocket.scale= 0.6;

  //groups
  asteroid2group= new Group();
  asteroid1group= new Group();
  bulletGroup= new Group();
  ftGroup= new Group();
  UFOgroup= new Group();
  marsGroup= new Group();
}

function draw() 
{
  background("black")

  //Game State Start
  if(gameState=== "start")
  {
    background(bg2Image);

    //Text
    text("Welcome to Mission Mars!", 180, 100, fill("white"), textSize(30));
    text("How to play:", 20, 200, fill("white"), textSize(20));
    text("Your aim is to reach Mars", 20, 240, fill("white"), textSize(20));
    text("1. Use the left and right arrow keys to avoid touching the asteroids.", 20, 270, fill("white"), textSize(20));
    text("2. There will be aliens on the way. Defend yourself from them using the", 20, 300, fill("white"), textSize(20));
    text("space key.", 20, 330, fill("white"), textSize(20));
    text("3. Collect the fuel by touching it otherwise you will soon run out of fuel.", 20, 360, fill("white"), textSize(20));
    text("Press the 'S' key to start!!", 170, 450, fill("white"), textSize(30));

    rocket.visible=false;
    bg.visible=false;

    if(keyDown('s'))
    {
      gameState="play";
    }
  }

//Game State Play
  if(gameState==="play")
  {
    rocket.visible=true;
    bg.visible=true;

    // Rocket Controls
    if(keyDown("right_arrow") && rocket.position.x<670)
    {
      rocket.position.x= rocket.position.x + 3;
    }
    if(keyDown("left_arrow"))
    {
      rocket.position.x= rocket.position.x - 3;
    }
    
    //Moving Background 
    if (bg.y > 250)
    {
      bg.y= 20;
    }
      
    //Create Bullet
    if(keyDown("space"))
    {
      Createbullet();
    }
      
    //Create Fuel Tanks
    if(frameCount%100 === 0)
    {
      spawnfueltank();
    }

    //Create UFO
    if(frameCount%100 === 0)
    {
      spawnUFO();
    }

    // Select Asteroids
    var selectAsteroid= Math.round(random(1,2));
    
    if (frameCount%170 === 0)
    {
      if(selectAsteroid=== 1)
      {
      spawnasteroid2();
      }
      if(selectAsteroid=== 2)
      {
      spawnasteroid1();
      }
    }
    
    //Destroy UFO
    if (bulletGroup.isTouching(UFOgroup))
    {
      bulletGroup.destroyEach();
      UFOgroup.destroyEach();
      score= score+1;
    }

    //Game End Criteria #1
    if(rocket.isTouching(asteroid1group))
    {
      gameState= "end";
    }
    if(rocket.isTouching(asteroid2group))
    {
      gameState= "end";
    }

    //Collect Fuel
    if(rocket.isTouching(ftGroup))
    {
      ftGroup.destroyEach();
      fuelLeft= fuelLeft+1;
    }

    //Decrease Fuel
    if(frameCount%200 === 0)
    {
      fuelLeft= fuelLeft - 1;
    }

    //Game End Criteria #2
    if(fuelLeft===0)
    {
      gameState= "end";
    }

    //Game End Criteria #3
    if(rocket.isTouching(UFOgroup))
    {
      gameState= "end";
    }

    //Create Mars
    if(frameCount===10000)
    {
      spawnMars();
    }

    //Game Win Criteria
    if(rocket.isTouching(marsGroup))
    {
      gameState= "win";
    }
  }

//Game State End
  if(gameState==="end")
  {
    //destroy commands
    UFOgroup.destroyEach();
    bulletGroup.destroyEach();
    asteroid1group.destroyEach();
    asteroid2group.destroyEach();
    ftGroup.destroyEach();
    rocket.destroy();
    bg.destroy();
    marsGroup.destroyEach();

    //restart
    if(keyDown('r'))
    {
      restart();
    }

    //text
    text("Oops!", 300, 220, textSize(20), fill("white"));
    text("You either ran out of fuel or met with an accident!!", 100, 250, textSize(20), fill("white"));
    text("Press 'R' to restart", 250, 280, textSize(20), fill("white"));
  }

//Game State Win
  if(gameState==="win")
  {
    //destroy commands
    UFOgroup.destroyEach();
    bulletGroup.destroyEach();
    asteroid1group.destroyEach();
    asteroid2group.destroyEach();
    ftGroup.destroyEach();
    rocket.destroy();
    bg.destroy();
    marsGroup.destroyEach();

    //replay
    if(keyDown('r'))
    {
      restart();
    }

    background(marsImg);

    //text
    text("Yay!", 320, 220, textSize(30), fill("white"));
    text("You have reached Mars!!", 200, 260, textSize(30), fill("white"));
    text("Press R to Replay!", 230, 300, textSize(30), fill("white"));
  }
  
 drawSprites();

 //text
 text("#UFO's destroyed: " + score, 20, 20, textSize(20), fill("white"));
 text("Fuel Left: " + fuelLeft +"00 gallons", 470, 20, textSize(20), fill("white"));
}

function Createbullet()
{
 var bullet= createSprite(250, 500, 90, 10);
 bullet.addImage(bulletImage);
 bullet.scale= 0.2;
 bullet.x = rocket.x;
 bullet.velocityY= -8;
 bullet.lifetime = 100;
 bulletGroup.add(bullet);
}

function spawnasteroid2()
{
  var asteroid2 = createSprite(0, 0, 20, 20);
  asteroid2.addImage(ast2);
  asteroid2.scale= 0.7;
  asteroid2.velocityY= 5;
  asteroid2.x= Math.round(random(40,680));
  asteroid2.lifetime = 140;
  asteroid2group.add(asteroid2)
}

function spawnasteroid1()
{
  var asteroid1 = createSprite(0, 0, 20, 20);
  asteroid1.addImage(ast1);
  asteroid1.scale= 0.5;
  asteroid1.velocityY= 5;
  asteroid1.x= Math.round(random(40,680));
  asteroid1.lifetime = 140;
  asteroid1group.add(asteroid1)
}

function spawnfueltank()
{
  var fueltank = createSprite(0, 0, 20, 20);
  fueltank.addImage(ft);
  fueltank.scale= 0.5;
  fueltank.velocityY= 5;
  fueltank.x= Math.round(random(40,680));
  fueltank.lifetime = 140;
  ftGroup.add(fueltank)
}

function spawnUFO()
{
  var UFO = createSprite(0, 0, 20, 20);
  UFO.addImage(UFOing);
  UFO.scale= 0.4;
  UFO.velocityY= 5;
  UFO.x= Math.round(random(40,680));
  UFO.lifetime = 140;
  UFOgroup.add(UFO)
}

function spawnMars()
{
  var mars= createSprite(350, 0, 50, 50);
  mars.addImage(marsImg)
  mars.scale= 1;
  mars.velocityY= 5;
  mars.lifetime = 140;
  marsGroup.add(mars)
}

function restart()
{
  gameState= "play";
  bg = createSprite(0, 300, 500, 500);
  rocket = createSprite(250, 640, 20, 50);
  rocket.addImage(rocketImage);
  bg.addImage(bgImage);
  rocket.scale= 0.5;
  bg.scale= 2;
  bg.velocityY= 3
  score=0;
  fuelLeft=5;

  if (bg.y > 250)
  {
    bg.y= 20;
  }
}
