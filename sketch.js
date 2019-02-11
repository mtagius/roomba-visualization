
frameCount = 0;

border = 20;
XandYmin = border;
Xmax = null;
Ymax = null;
dotSize = 5;
coordinates = [];
screenCoordinates = [];


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

  //coordinates.push([Math.floor((Xmax + border) / 2), Ymax]);

}

function draw() {
  background("#f0f9f0");

  if(frameCount++ >= 15) {
    frameCount = 1;
    //createPoint();
    $.ajax({
      url: "http://localhost:3000/api/local/info/mission",
      type: "GET",
      success: function(result) {
        x = result.pose.point.x;
        y = result.pose.point.y;
        if(coordinates.length > 0) {
          if(x == coordinates[coordinates.length - 1][0] && y == coordinates[coordinates.length - 1][1]) {

          } else {
            console.log("X: " + x);
            console.log("Y: " + y);
            coordinates.push([x, y]);
          }
        } else {
          console.log("X: " + x);
          console.log("Y: " + y);
          coordinates.push([x, y]);
        }
      }
    });
  }

  var lowestX = 0;
  var lowestY = 0;

  screenCoordinates = [];

  for(i = 0; i < coordinates.length; i++) {
    if(coordinates[i][0] < lowestX) {
      lowestX = coordinates[i][0];
    }
    if(coordinates[i][1] < lowestY) {
      lowestY = coordinates[i][1];
    }
  }

  for(i = 0; i < coordinates.length; i++) {
    screenCoordinates.push([coordinates[i][0] + abs(lowestX) + 1, coordinates[i][1] + abs(lowestY) + 1]);
  }

  var highestX = 0;
  var highestY = 0;


  for(i = 0; i < screenCoordinates.length; i++) {
    if(screenCoordinates[i][0] > highestX) {
      highestX = screenCoordinates[i][0];
    }
    if(screenCoordinates[i][1] > highestY) {
      highestY = screenCoordinates[i][1];
    }
  }

  var xRatio = false;
  var yRatio = false;

  if((windowWidth - (2 * border)) < highestX) {
    xRatio = true;
  }
  if((windowHeight - (2 * border)) < highestY) {
    yRatio = true;
  }

  if(xRatio && yRatio) {
    if(((windowWidth - (2 * border)) - highestX) < ((windowHeight - (2 * border)) - highestY)) {
      xRatio = true;
      yRatio = false;
    } else {
      xRatio = false;
      yRatio = true;
    }
  }


  for(i = 0; i < screenCoordinates.length; i++) {
    if(xRatio) {
      xRatio = (windowWidth - (2 * border)) / highestX;
      screenCoordinates[i][0] = Math.floor(lerp(0, (windowWidth - (2 * border)), screenCoordinates[i][0] / highestX)) + border;
      screenCoordinates[i][1] = Math.floor(screenCoordinates[i][1] * xRatio) + border;
    } else if (yRatio) {
      yRatio = (windowHeight - (2 * border)) / highestY;
      screenCoordinates[i][0] = Math.floor(screenCoordinates[i][0] * yRatio) + border;
      screenCoordinates[i][1] = Math.floor(lerp(0, (windowHeight - (2 * border)), screenCoordinates[i][1] / highestY)) + border;
    } else {
      screenCoordinates[i][0] += border;
      screenCoordinates[i][1] += border;
    }
  }

  highestX = 0;
  highestY = 0;

  for(i = 0; i < screenCoordinates.length; i++) {
    if(screenCoordinates[i][0] > highestX) {
      highestX = screenCoordinates[i][0];
    }
    if(screenCoordinates[i][1] > highestY) {
      highestY = screenCoordinates[i][1];
    }
  }

  for(i = 0; i < screenCoordinates.length; i++) {
    screenCoordinates[i][0] += Math.floor(((windowWidth - (2 * border)) - highestX) / 2);
    screenCoordinates[i][1] += Math.floor(((windowHeight - (2 * border)) - highestY) / 2);
  }

  for(i = 0; i < screenCoordinates.length; i++) {
    fill("#40493B");
    noStroke();
    //ellipse(screenCoordinates[i][0], screenCoordinates[i][1], dotSize, dotSize);
    if(i > 0) {
      stroke("#40493B");
      strokeWeight(3);
      line(screenCoordinates[i - 1][0], screenCoordinates[i - 1][1], screenCoordinates[i][0], screenCoordinates[i][1]);
    }
  }
}


