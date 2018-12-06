$(document).ready(function () {
    // An array of actions, new actions will be pushed into this array;
    var videoGames = ["Red Dead Redemption", "Mario Kart", "Call of Duty 4", "Overwatch", "PUBG", "Pokemon Red", "Breath of the Wild", "Halo 2", "Metal Gear Solid 4", "Pac-Man", "Smash Bros Ultimate", "Donkey Kong Country", "Minecraft"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons() {
        $("#buttons").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < videoGames.length; i++) {
            var createdButton = $("<button>");
            createdButton.addClass("videogames");
            createdButton.attr("data-name", videoGames[i]);
            createdButton.text(videoGames[i]);
            $("#buttons").append(createdButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#test").on("click", function () {
            var videoGame = $("#myText").val().trim();
            videoGames.push(videoGame);

            displayGifButtons();

        });
    }
    // Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last

    // Function that displays all of the gifs
    function displayGifs() {
        var game = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ybLTNlQYiDXD3d07c83w3dRazaTZvMHZ&q=" + game + "&limit=10&offset=20&rating=PG13&lang=en";
        /// console log to show the full url created
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                /// this makes it so we can only have 10 gifs at a time
                $("#pictest").empty();
                var results = response.data;

                /// for loop to run through all of the results we get and apply the following to each

                for (var i = 0; i < results.length; i++) {

                    /// creates a div to keep the image and links/ratings inside

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    // adds the rating and fullsize/download link text to the div
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    var gifLink = $("<p>").html("<a href=" + results[i].bitly_url + ">Full Size/Download</a>");
                    gifDiv.append(gifRating);
                    gifDiv.append(gifLink);

                    // adds all the data states to the images that will be used to pause/unpause
                    // this also creates an image of the gif and applies the attributes and classes then
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.original.url);
                    gifImage.attr("data-still", results[i].images.original_still.url);
                    gifImage.attr("data-animate", results[i].images.original.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // pulling still image of gif
                    // adding div of gifs to gifsView div
                    $("#pictest").prepend(gifDiv);
                }
            });
    }
    // This calls the starting functions, it will let users add buttons as well as generate buttons for my intital options
    displayGifButtons();
    addNewButton();


    /// Created on clicks for anything with the class video game, this will call the display gif function

    $(document).on("click", ".videogames", displayGifs);

    /// Created on click event for all elements with .image class, this will then run the change state function that will pause and unpause the gifs

    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});




///// OLD ATTEMPTS BELOW //////////////

// $(document).ready(function () {

//     //// Creating an inital array of games (to be buttons)

//     var games = ["GTA V", "Super Mario"];


//     function makebuttons() {
//         $("#buttons").empty();
//         for (var i = 0; i < games.length; i++) {
//             var generatedbutton = $("<button>");
//             generatedbutton.addClass("videogames")
//             generatedbutton.attr("data-name", games[i]);
//             generatedbutton.text(games[i]);
//             $("#buttons").append(generatedbutton);
//             console.log(games[i]);
//         }
//     }

//     function newbuttons() {
//         var game = $("#myText").val().trim();

//         // game.attr("data-name", games[i]);
//         games.push(game);
//         makebuttons();
//         console.log(game);
//         console.log(games);
//     }




// $(document).ready(function () {

// var games = ["GTA V","Super Mario"];

// function myFunction() {
//     var x = $("#myText").val().trim();
//     console.log(x);
//     var term = x;
//     games.push(x);
//     makebuttons();



// var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ybLTNlQYiDXD3d07c83w3dRazaTZvMHZ&q=" + term + "&limit=10&offset=0&rating=PG&lang=en";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {



//         for (i = 0; i < response.data.length; i++) { 

//             // $("#pictest").prepend("Rating: " + response.data[i].rating + "<img id='gifs' src=" + response.data[i].images.original.url + ">");

//             var gifbox = $("<div1>");
//              //pull rating of gif
//             var rating = $("<p>").text("Rating: " + response.data[i].rating);
//             gifbox.append(rating);

//                             //pull gif
//             var gif = $("<img>");
//             gif.attr("src", response.data[i].images.original.url);
//                             //paused images
//             gif.attr("data-still", response.data[i].images.fixed_height_small_still.url);
//                             //animated images
//             gif.attr("data-animate", response.data[i].images.fixed_height_small.url);
//                             // how images come in, already paused
//             gif.attr("data-state", "still");
//             gifbox.append(gif);
//                             //add new div to existing divs
//             $("#pictest").prepend(gifbox);

//         }



//         function pausegif() {
//             $("#gifs").attr("src", response.data[i].images.original-still.url);

//         }

//         // $(img).click(pausegif);

//       console.log(response);
//     });


// }

// function makebuttons() {

//     // Deletes the movies prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons").empty();
//     // Loops through the array of movies
//     for (var i = 0; i < games.length; i++) {

//       // Then dynamicaly generates buttons for each movie in the array
//       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//       var selection = $("<button>");
//       // Adds a class of movie to our button
//       selection.addClass("games");
//       // Added a data-attribute
//       selection.attr("data-name", games[i]);
//       // Provided the initial button text
//       selection.text(games[i]);
//       // Added the button to the buttons-view div
//       $("#buttons").append(selection);
//     }
// }



// makebuttons();



// $("#test").click(myFunction);

// // $(document).on("click", ".game", myFunction);

// });