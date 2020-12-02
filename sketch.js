var player, enemyGroup, bulletsGroup, ebulletsGroup;
var enemyHits, score, gameState, play;
function preload(){
playerImage = loadImage("Player.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  player = createSprite(50,height/2 , 20, 40);
  player.addImage(playerImage);
  enemyGroup = createGroup();
  bulletsGroup = createGroup();
  ebulletsGroup = createGroup();
  gameState = 0;
  play = 1;
  enemyHits = 3;
  score = 0;
  textSize(30);
}
function draw(){
  background(0);
  switch(gameState){
    case 0: text("How to Play?", 100, 100);
    text("1. You shoot by pressing 'Space'", 100, 200);
    text("2. If You get shot 3 times you LOSE", 100, 300);
    text("3. If the invaders get past you, you LOSE", 100,400);
    text("4. You win if you have 20 kills",100,500)
    text("Press Space to Continue", 800,550);
    if(keyDown("space")){
      gameState = 1;
    }
    break; 
    case 1:  player.y = mouseY  
    text("Score : "+score,600,50)
    drawSprites();
    if(play){
      spawnEnemies();
    }
    
    createBullets1();
    if(keyWentDown("space")){
      var bullet = createSprite(player.x,player.y,10,5);
      bullet.shapeColor = "blue";
      bulletsGroup.add(bullet);
      bullet.x = player.x
      bullet.y = player.y
      bullet.velocityX = 20; 
    }
    if(enemyHits===0){
      enemyGroup.setVelocityEach(0,0)
      play = 0
      bulletsGroup.destroyEach();
      ebulletsGroup.destroyEach();
      textSize(30);
      text("You Lost", 600,300);
    }
    for(var j = 0; j<ebulletsGroup.length; j++){
      var b = ebulletsGroup.get(j);
      if(b.isTouching(player)){
        b.destroy();
        enemyHits--;
      }
    }
    for(var i = 0; i<enemyGroup.length; i++){
      var e = enemyGroup.get(i);
      if(e.x<0){
        enemyGroup.setVelocityEach(0,0)
        play = 0;
      bulletsGroup.destroyEach();
      ebulletsGroup.destroyEach();
      textSize(30);
      text("You Lost", 600,300);
      }
      for(var j = 0; j<bulletsGroup.length; j++){
        var b = bulletsGroup.get(j);
        if(b.isTouching(e)){
          b.destroy();
          e.destroy();
          score++
        }
      }
    }
    if(score===20){
      gameState = 2;
    }
    break;
    case 2: text("Congrats You Won", 600,300);
  }
 
}

function spawnEnemies(){
  if(frameCount%30 === 0){
var y = Math.round(random(50,550));
var enemy = createSprite(1200,y,30,50);
enemy.velocityX = -3;
enemyGroup.add(enemy);
  }
};

function createBullets1(){
  if(frameCount%30===0){
  var i = Math.round(random(0,enemyGroup.length-1))
  var ebullet = createSprite(enemyGroup.get(i).x,enemyGroup.get(i).y,10,5);
  ebullet.velocityX = -20
  ebullet.shapeColor = "red";
  ebulletsGroup.add(ebullet);
  
}

}
