# PhoneGapWhackABug
A simple PhoneGap/Cordova game used as an instructional tool.  Squish some bugs to earn points...
(Work in Progress)

Whack a Bug
=
An intro to PhoneGap/Cordova in Visual Studio 2015

Create a New Project
=
In Visual Studio 2015, create a new Apache Cordova project.  For this example, we will be creating “Whack a Bug.”  
After creating the project, you’ll notice a www folder.  This is where the main files to execute your application will live.

Download Third Party Scripts
Download the following files and include them in your www folder
 - jQuery: https://jquery.com/
 - Font Awesome: https://fortawesome.github.io/Font-Awesome/

Application Screens
=
Cordova/PhoneGap applications are ultimately a device’s native web view hosting our HTML and JavaScript.  Some people follow the single page app paradigm when creating these apps.  For the sake of brevity, we will be using multiple pages in this tutorial.  We will have an index page which is launched when the app is started, along with a play page to play the game.

Index.html
= 
We don’t need anything fancy here!  There are some things that will be required on every page.  To get started, let’s add a h1 element with the name of our app, and a link to the next page, which will be play.html.  Also, make sure that you are referencing the cordova.js file, or this app will not work.

Play.html
=
In your www folder, you will want to create a new html file named play.html.  This is going to be where we create the actual “fun” part of our app!

A great starting point for this file would be to copy and paste the contents of index.html.
Additionally, we should create play.js in the www/scripts folder, and play.css in the www/css folder. As we did with the html, copy and paste the contents of the index.js file to give us a head start.

Add references to the font awesome css and the jquery js files.

We will also want a place to keep score.  Go ahead and add a span for this with “0” as the text, and style it however you want in the play.css file.

Play.js
=
This is where we get to create our game.  There’s already a couple of things in this file that Cordova has generated for us.  All of our scripts should be executed when Cordova is done loading and says the device is ready.  There is already an onDeviceReady function in place for us to use.

Let’s get started with setting up some options for the game.  Our game config should have the following variables, all as numbers:
 - A time limit for the game in milliseconds
 - A minimum font size
 - A maximum font size
 - The minimum amount of time before creating a new bug after the last one was created
 - The maximum amount of time before creating a new bug after the last one was created
 - The exact amount of time when we will create a new bug
 - The amount of time the bug should be displayed before fading out

We will also need an event listener for when someone taps a bug.  Because jQuery is so awesome, it knows that a tap (for all intents and purposes) counts as a click.  When someone clicks (or taps) a bug, we want to remove it and give them points.

We need a mechanism for creating the bugs.  JavaScript gives us the setInterval method, which perfectly suits our needs for this.  We will set it to continue based on the game config’s “exact amount of time when we will create a new bug”

Finally, we need a mechanism to know when the game is over, alert the user, and stop adding bugs.  setTimeout seems appropriate, and we will set it to execute based on the config’s time limit for the game.

We should create a method to making a bug.  To make a bug, we need to know the font size, the amount of time for which the bug should be displayed, and the x,y coordinates of the bug (as an array).  We want to make sure the bug is taken off of the DOM and points are taken away when it is time, so in this method we also have a set timeout.

