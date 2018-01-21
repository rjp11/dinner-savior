var selectResult = {};
var getPhotoURLByReference = function (ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyABxTiVVJ0EDcIaW2OPg15xCz0B4LcsxWs`
};
$(document).ready(function () {
    $(".restaurant-image").empty();
    $(".restaurant-info").empty();
    //event.preventDefault();
    var search = localStorage.getItem("search");
    //$("#search-input").val().trim();
    var queryURL = 'https://cors-anywhere.herokuapp.com/' +
        'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+ChicagoIL' +
        search + '&key=AIzaSyABxTiVVJ0EDcIaW2OPg15xCz0B4LcsxWs';
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
            for (var i = 0; i < result.length; i++) {

                var photoRef = result[i].photos[0].photo_reference;
                var url = getPhotoURLByReference(photoRef);

                var img = `<img src='${url}'>`;
                var name = `<a class='selected' href='wait-input.html'> <h3>${result[i].name}</h3></a>`;
                var p = `<h6> Rating: ${result[i].rating}`;
                var address = `<h6>${result[i].formatted_address}`;

                var selectButton = $("<button>").text(" Select ");
                selectButton.addClass("selected");
                selectButton.attr("data-name", result[i].name);
                selectButton.attr("data-rating", result[i].rating);
                selectButton.attr("data-address", result[i].formatted_address);
                selectButton.attr("data-image", img);

                var restaurantDiv = $(`<div class='row one-restaurant'> <div class='col-lg-6 col-md-8 col-sm-12 col-xs-12' id='search-image'>${img}</div> <div class='col-lg-6 col-md-4 col-sm-12 col-xs-12' id='search-info'> <div id='search-info-text'${name} ${p} ${address}</div></div> </div>`);
                
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
    var img = $(this).attr("data-image");
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