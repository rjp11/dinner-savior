$(document).ready(function(){
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
    $(".recipes-header").hide();
    $("#get-recipe").on("click", function(){
        var queryURL = "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_type=zone&q="+ inputRestName + "&start=0&count=10&lat=41.881832&lon=-87.623177&apikey=76bdd00d04ef3b4840c98961c3dd363e"
        $.ajax({
            url: queryURL,
            method : "GET"
        })
        .done(function(response){   
            var styles = response.restaurants[0].restaurant.cuisines;
            console.log(styles)
            var style = styles.split(",")[0]
            $("#dish-style").text(style);
            var apiKey = "3c5cf2a76798a4875b2063b8fb23d043"
            var appID = "ab462d6d"
            var queryURL = `https://api.edamam.com/search?q=${style}&app_id=${appID}&app_key=${apiKey}&from=0&to=3&diet=balanced&ingr=10&calories=1000`
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                if (response) {
                    for (var j = 0; j < 3; j++) {
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