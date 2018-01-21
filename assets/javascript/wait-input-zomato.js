$(document).ready(function(){
    $(".recipes-header").hide();
    var inputRestName = localStorage.selected_restaurant;
    $.fn.scrollView = function () {
        return this.each(function () {
          $('html, body').animate({
            scrollTop: $(this).offset().top
          }, 3000);
        });
      }
    var displayRecipes = function(data){
        var newDiv = $("<div class='recipe row'>");
        var img = $("<img>")
        img.attr("src", data.image);
        var left = $("<div class='col-md-6'>").append(img);
        var name = $("<h5>").text(data.label);
        var link = $("<a>").text("Source: "+ data.source);
        link.attr("href", data.url)
        var ingreTitle = $("<p>").text("Ingredients:")
        var ingre = $("<ul>")
        var ingreData= data.ingredientLines;
        for(var i = 0; i < ingreData.length; i++){
            var li = $("<li>").text(ingreData[i]);
            ingre.append(li);
        }
        var servings= $("<p>").text("Servings: "+data.yield);              
        var right = $("<div class='col-md-6 pull-left'>").append(name,ingreTitle,ingre,servings,link)
        newDiv.append(left,right)
        $(".display").append(newDiv);  
    }
    $("#get-recipe").on("click", function(){
        var cityLat = 41.881832;
        var cityLong = -87.623177
        var queryURL = "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_type=zone&q="+ 
        inputRestName + "&start=0&count=10&lat=" + cityLat + "&lon="+ cityLong + "&apikey=76bdd00d04ef3b4840c98961c3dd363e"
        $.ajax({
            url: queryURL,
            method : "GET"
        })
        .done(function(response){   
            var styles = response.restaurants[0].restaurant.cuisines;
            var first = styles.split(",")[0];
            var styleSearch= first !== "American" ? first:"American diner"
            $("#dish-style").text(first);
            var apiKey = "3c5cf2a76798a4875b2063b8fb23d043"
            var appID = "ab462d6d"
            var queryURL = `https://api.edamam.com/search?q=${styleSearch}&app_id=${appID}&app_key=${apiKey}&from=0&to=3`
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                if (response) {
                    for (var j = 0; j < response.hits.length; j++) {
                        var data = response.hits[j].recipe 
                        console.log(data)
                        displayRecipes(data);        
                    }
                }
            });
            $(".recipes-header").show();        
            $("#show-recipes").scrollView();
        })
    });       
})