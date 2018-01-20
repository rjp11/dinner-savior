var selectResult = {};
var picked = {};
var getPhotoURLByReference = function (ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyCBPyv2jsI299n6NBrTgszQfbPzWI-4ukc`
};
$("#search").on("click", function (event) {
    $("#Possible-matches").empty();
    event.preventDefault();
    var search = $("#search-input").val().trim();
    var queryURL = 'https://cors-anywhere.herokuapp.com/' +
        'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+ChicagoIL' +
        search + '&key=AIzaSyCBPyv2jsI299n6NBrTgszQfbPzWI-4ukc';
    // performing an AJAX GET request
    //remember to add your API KEY to the url above. 

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from request
        .done(function (response) {
            //console.log(queryURL);
            //console.log(response);

            var result = response.results;
            console.log(result);
            // Looping through each result item
            for (var i = 0; i < result.length; i++) {
                // Creating and storing a div tag
                picked = result[i].formatted_address;
                var restaurantDiv = $("<div>").text(result[i].name);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + result[i].rating);
                var address = $("<p>").text("Adress: " + result[i].formatted_address);
                var selectButton = $("<button>").text(" Select ");
                selectButton.addClass("selected");
                selectButton.attr("data-name", result[i].name);
                selectButton.attr("data-rating", result[i].rating);
                selectButton.attr("data-address", result[i].formatted_address);
                //?????var selectButton = $("<button onclick = selectedFunction(selectResult)>").text(" Select ");???????
                // Creating and storing an image tag
                //var restaurantImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                //restaurantImage.attr("src", results[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the restaurantDiv
                //this is where I store the photoreference                 
                var photoRef = result[i].photos[0].photo_reference;
                var url = getPhotoURLByReference(photoRef);
                var img = $("<img>");
                img.attr("src", url);

                restaurantDiv.append(p, address, selectButton, img);
                // Prependng the restaurantDiv 
                $("#Possible-matches").append(restaurantDiv);
            }
        });
    $("#search-input").val("");
});

$(document).on("click", ".selected", function () {
    //console.log("the functions works");
    selectResult = {
        name: $(this).attr("data-name"),
        rating: $(this).attr("data-rating"),
        address: $(this).attr("data-address"),
        //add image url
        //image: $(this).attr("")
    }
    localStorage.clear();
    localStorage.setItem("selected-restaurant", selectResult);
    location.href = "wait-input.html";
});
