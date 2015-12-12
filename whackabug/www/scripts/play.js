// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    // Set the options for our game play
    var gameConfig = {
        timeLimitMS: 30000,     // Determines when the game will be over
        minFontSize: 18,        // The minimum font size (bug size)
        maxFontSize: 36,        // The maximum font size (bug size)
        minNewBugMS: 500,       // The minimum amount of time in milliseconds before displaying a new bug
        maxNewBugMS: 2000,      // The maximum amount of time in milliseconds before displaying a new bug
        nextBugInMS: 1000,      // When the "next" bug will be displayed.  This is updated dynamically
        bugDisplayTimeMS: 2500  // The amount of time given to tap the bugs
    };

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        // Set up the handlers for when a bug is tapped.
        $(document).on('click', '.bug', function (e) {
            e.preventDefault();

            // Remove the bug and add to the score
            $(this).hide();
            $(this).remove();
            addScore(100);
        });

        // Start creating bugs
        var bugInterval = setInterval(function () {
            var bugFontSize;        // The font size of this bug

            // Random amount of milliseconds between the min and max value
            gameConfig.nextBugInMS = gameConfig.minNewBugMS + Math.random() * gameConfig.maxNewBugMS;

            // Random font size between the min and max thresholds
            bugFontSize = gameConfig.minFontSize + Math.random() * gameConfig.maxFontSize;

            // Get a random position on the screen to display the bug.
            var bugCoords = [getRandomX(), getRandomY()];

            // Create the bug
            var theBug = createBug(bugFontSize, gameConfig.bugDisplayTimeMS, bugCoords);

            theBug.hide();
            theBug.appendTo('body');
            theBug.fadeIn(200, null);
        }, gameConfig.nextBugInMS);

        // Set the timeout to end the game
        setTimeout(function () {
            // Stop generating bugs
            clearInterval(bugInterval);
            // Tell the user the game is over.
            gameOver();
        }, gameConfig.timeLimitMS);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    /// Creates a tapable bug for gameplay
    function createBug(fontSize, bugTimeOut, bugCoords) {
        var bug = $('<i />', {
            class: 'fa fa-bug bug'
        }).css('font-size', fontSize)
        .css('position', 'absolute')
        .css('left', bugCoords[0])
        .css('top', bugCoords[1]);

        setTimeout(function () {
            // The bug is hidden when it's clicked, then removed from the dom.
            // The reference may still exist here though, so first check to see if it is showing
            // for the purposes of calculating the score
            if (bug) {
                if (bug.is(':visible')) {
                    addScore(-20);
                }
                bug.remove();
            }
        }, bugTimeOut);
        return bug;
    };

    // Get a random x position
    function getRandomX() {
        var documentWidth = $(document).width();
        var padding = 30;
        return Math.max((Math.random() * documentWidth - 100), padding) > documentWidth ? documentWidth - padding : Math.max((Math.random() * documentWidth - 100), padding);
    };

    // Get a random y position
    function getRandomY() {
        var docmeuntHeight = $(document).height();
        var padding = 50;
        return Math.max((Math.random() * docmeuntHeight - 100), padding) > docmeuntHeight ? docmeuntHeight - padding : Math.max((Math.random() * docmeuntHeight - 100), padding);
    };

    function gameOver() {
        $('body').css('text-align', 'center');
        $('<h1 />', {
            text: 'Game Over!'
        })
            .hide()
            .appendTo('body')
            .fadeIn(500, null);
    };

    function addScore(pointsToAdd) {
        var scoreNumber = parseInt($('#score').text());
        scoreNumber += pointsToAdd;
        $('#score').text(scoreNumber);
    };
})();