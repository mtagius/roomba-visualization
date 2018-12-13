
frameCount = 0;

border = 20;
XandYmin = border;
Xmax = null;
Ymax = null;
dotSize = 15;
coordinates = [];


function createPoint() {
  badPoint = true;
  while(badPoint) {
    badPoint = false;
    x = coordinates[coordinates.length - 1][0] + Math.floor(lerp(-150, 150, Math.random()));
    y = coordinates[coordinates.length - 1][1] + Math.floor(lerp(-150, 150, Math.random()));
    if(x < border || x > Xmax) {
      badPoint = true;
    }
    if(y < border || y > Ymax) {
      badPoint = true;
    }
  }
  coordinates.push([x, y]);
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  frameRate(30);

  Xmax = windowWidth - border;
  Ymax = windowHeight - border;

  coordinates.push([Math.floor((Xmax + border) / 2), Ymax]);
}

function draw() {
  background("#f0f9f0");

  if(frameCount++ >= 15 && coordinates.length < 100) {
    frameCount = 1;
    createPoint();
  }

  for(i = 0; i < coordinates.length; i++) {
    fill("#40493B");
    noStroke();
    ellipse(coordinates[i][0], coordinates[i][1], dotSize, dotSize);
    if(i > 0) {
      stroke("#40493B");
      strokeWeight(3);
      line(coordinates[i - 1][0], coordinates[i - 1][1], coordinates[i][0], coordinates[i][1]);
    }
  }
}


