

$(document).ready(function() {


    $("#form-gif-request").submit(function(event) {

        // Prevent form from POST
            event.preventDefault();

        // Riddle input value
            var riddleInput = $('#riddleResponse').val();
            console.log(riddleInput);

        // Is the user's answer 5? If so, fetcn and display gif.
            if ( riddleInput == "5" )   {
                fetchAndDisplayGif();
            } else {
                $("#feedback").text("You stupid idiot! Now you can't have a GIF.");
                setGifLoadedStatus(false);
            }

    });

});


/**
 * sends an asynchronous request to Giphy.com asking for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */

function fetchAndDisplayGif() {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.


    // Loader
    $("#feedback").attr("hidden", false);
    $("#feedback").text("Loading...");



    // get the user's input text from the DOM
    var searchQuery = $('#searchTag').val(); // TODO should be e.g. "dance"
    var searchArray = ["jackson 5", searchQuery];

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : searchArray.join(" ") // TODO should be e.g. "jackson 5 dance"
    }

    // make an ajax request for a random GIF
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            var imageUrl = JSON.stringify(response["data"]["image_url"] );

            // Remove Double Quotes ( "" ) from around the Images URL.
            var imageUrl = imageUrl.replace(/\"/g, "");

            console.log( "Response:" + imageUrl);

            // TODO
            // 1. set the source attribute of the returned image to the imageUrl variable
            // 2. hide the feedback message and display the image

            $("#gif").attr("src", imageUrl);
            setGifLoadedStatus(true);
        },
        error: function(response) {
            // if something went wrong, the code in here will execute instead of the success function
            console.log("ERROR:" + response);
            // give the user an error message

            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });


}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    var display = isCurrentlyLoaded ? "block" : "none"; // inline ternary operator
    $("#gif").css("display", display);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
