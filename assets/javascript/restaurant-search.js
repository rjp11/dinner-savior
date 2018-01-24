var selectResult = {};
var getPhotoURLByReference = function (ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyAI_-LF5954Vl6HNopXzOqCK2X4zkqRNCE`;
};
$(document).ready(function () {
    $(".restaurant-image").empty();
    $(".restaurant-info").empty();
    //event.preventDefault();
    var search = localStorage.getItem("search");
    //$("#search-input").val().trim();
    var queryURL = 'https://cors-anywhere.herokuapp.com/' +
        'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+ChicagoIL' +
        search + '&key=AIzaSyAI_-LF5954Vl6HNopXzOqCK2X4zkqRNCE';
    // performing an AJAX GET request
    //remember to add your API KEY to the url above. 
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from request
        .done(function (response) {
            var result = response.results;
            // Looping through each result item
            for (var i = 0; i < 5; i++) {
                var photoRef = result[i].photos[0].photo_reference;
                var url = getPhotoURLByReference(photoRef);
                var restName = result[i].name;
                var restRating = result[i].rating;
                var restAddress = result[i].formatted_address;
                var nameDiv = $("<h3 class='selected'>").text(restName);
                var ratingDiv = $("<h6>").text(restRating);
                var addressDiv = $("<h6>").text(restAddress);
                var imgDiv = $(`<img src=${url}>`)
                var anchorDiv = $("<a href='wait-input.html'>").append(nameDiv)

                nameDiv.attr("data-name", restName);
                nameDiv.attr("data-rating", restRating);
                nameDiv.attr("data-address", restAddress);
                nameDiv.attr("data-imageURL", url);
                var restaurantDiv = $("<div class='row one-restaurant'>");
                var imageDiv = $("<div class='col-lg-6 col-md-8 col-sm-12 col-xs-12' id='search-image'>").append(imgDiv);
                var textDiv = $(`<div id='search-info-text'>`).append(anchorDiv,ratingDiv, addressDiv);
                var infoDiv = $("<div class='col-lg-6 col-md-4 col-sm-12 col-xs-12' id='search-info'>").append(textDiv);

                restaurantDiv.append(imageDiv, infoDiv)
                $(".search-results").append(restaurantDiv);
                // $("#search-info").append(selectButton);
            }
        });
});

$(document).on("click", ".selected", function () {
    //console.log("the functions works");
    var name = $(this).attr("data-name");
    var rating = $(this).attr("data-rating");
    var address = $(this).attr("data-address");
    var img = $(this).attr("data-imageURL");
    //add image url
    //image: $(this).attr("")
    /////////////////  OR IF YOU CAN NOT GET ACCESS TO OBJECT selecResult  then/////////
    localStorage.setItem("selected_restaurant", name);
    localStorage.setItem("selected_rating", rating);
    localStorage.setItem("selected_address", address);
    localStorage.setItem("selected_img", img);
    console.log(localStorage.selected_restaurant);
    location.href = "wait-input.html";
});