# Roomba Visualization

This web app tracks the path of a roomba and draws its path using [p5.js](https://p5js.org/)

To get the x & y coordinates of the roomba I use [dorita980](https://github.com/koalazak/dorita980) and [rest980](https://github.com/koalazak/rest980).  The vagrant file in the vagrant folder creates an ubuntu vm that runs rest980 with the values given to it from the default.json file.  Once the local server is setup this web app can get the x & y values by calling the API at http://localhost:3000/api/local/info/mission.  A CORS blocker will have to be used for that to work.

Once all that is running this app will draw the roomba's path and will auto resize the canvas to fit the size of any room.  Here are some of the results below.

![Screenshot1](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot1.PNG)

![Screenshot2](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot2.PNG)

![Screenshot3](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot3.PNG)

![Screenshot4](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot4.PNG)

![Screenshot5](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot5.PNG)

![Screenshot6](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot6.PNG)

![Screenshot7](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot7.PNG)

![Screenshot8](https://github.com/mtagius/roomba-visualization/blob/master/Screenshot8.PNG)
