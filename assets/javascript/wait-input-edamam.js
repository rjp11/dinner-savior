//THE FOLLOWING JAVASCRIPT IS FOR THE EDAMAM API WITHIN THE WAIT-INPUT HTML
var displayRecipe = function () {
    var newDiv = $("<div>");
    var name = $("<h3>").text(dish.name);
    var img = $("<img>")
    img.attr("src", dish.imgURL);
    var link = $("<a>").text(dish.source);
    link.attr("href", dish.repURL)
    newDiv.append(name).append(img).append(link);
    $(".recipes").append(newDiv);
}
var dish = {};
$("button").on("click", function () {
    $(".recipes").empty();
    var style = $("input").val()
    console.log(style)
    var apiKey = "3c5cf2a76798a4875b2063b8fb23d043"
    var appID = "ab462d6d"
    var queryURL = `https://api.edamam.com/search?q=${style}&app_id=${appID}&app_key=${apiKey}&from=0&to=3`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(queryURL);
        console.log(response);
        if (response) {
            for (var j = 0; j < 3; j++) {
                var data = response.hits[j].recipe;
                dish = {
                    name: data.label,
                    imgURL: data.image,
                    source: data.source,
                    repURL: data.url,
                    calories: data.calories,

                }
                displayRecipe();
                console.log(dish)
            }
        }
    });
})