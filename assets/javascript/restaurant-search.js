var selectResult = {};
var getPhotoURLByReference = function (ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyCBPyv2jsI299n6NBrTgszQfbPzWI-4ukc`
};
$(document).ready (function () {
    $(".col-sm-4").empty();
    //event.preventDefault();
    var search = localStorage.getItem("search");
    //$("#search-input").val().trim();
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
                var restaurantDiv = $("<div id = selected-restaurant>").text(result[i].name);
                var photoRef = result[i].photos[0].photo_reference;
                var url = getPhotoURLByReference(photoRef);
                var img = $("<img>");
                img.attr("src", url);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + result[i].rating);
                var address = $("<p>").text("Adress: " + result[i].formatted_address);
                var selectButton = $("<button>").text(" Select ");
                selectButton.addClass("selected");
                selectButton.attr("data-name", result[i].name);
                selectButton.attr("data-rating", result[i].rating);
                selectButton.attr("data-address", result[i].formatted_address);
                selectButton.attr("data-image", img);
                //?????var selectButton = $("<button onclick = selectedFunction(selectResult)>").text(" Select ");???????
                // Creating and storing an image tag
                //var restaurantImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                //restaurantImage.attr("src", results[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the restaurantDiv
                //this is where I store the photoreference                 
                restaurantDiv.append(p, address, selectButton, img);
                // Prependng the restaurantDiv 
                $(".col-sm-4").append(restaurantDiv);
            }
        });
    //$("#search-input").val("");
});

$(document).on("click", ".selected", function () {
    //console.log("the functions works");
    
        var name = $(this).attr("data-name");
        var rating = $(this).attr("data-rating");
        var address = $(this).attr("data-address");
        var img = $(this).attr("data-image");
        //add image url
        //image: $(this).attr("")
        /////////////////  OR IF YOU CAN NOT GET ACCESS TO OBJECT selecResult  then/////////
    
    localStorage.clear();
    localStorage.setItem("selected_restaurant", name);
    localStorage.setItem("selected_rating", rating);
    localStorage.setItem("selected_address", address);
    localStorage.setItem("selected_img", img);
    console.log(localStorage.selected_restaurant);
    location.href = "wait-input.html";
});
