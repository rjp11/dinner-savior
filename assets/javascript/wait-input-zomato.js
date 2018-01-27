$(document).ready(function(){
    var inputRestName = localStorage.selected_restaurant;
    var apiKey_edamam = "3c5cf2a76798a4875b2063b8fb23d043";
    var appID_edamam = "ab462d6d";
    $(".recipes-header").hide();
    $.fn.scrollView = function () {
        return this.each(function () {
          $('html, body').animate({
            scrollTop: $(this).offset().top
          }, 2500);
        });
      }
    var displayRecipeHeader = function(style){
        $(".recipes-header").text("")
        $(".recipes-header").prepend(`Here are three awesome ${style} recipes `);
        $(".recipes-header").show();
    }
    var displayRecipes = function(data){
        var newDiv = $("<div class='recipe row'>");
        var img = $("<img>")
        img.attr("src", data.image);
        var left = $("<div class='col-md-6'>").append(img);
        var name = $("<h4>").text(data.label);
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
    var placeNewSearchBar = function(){
        var newInput = $("<input type='text' class='form-control search-terms' placeholder='Find more recipes'>")
        var button = $("<button class='btn btn-default' type='button' id='search-more'>").text("GO");
        var newSpan = $("<span class='input-group-btn'>").append(button)
        var newDiv = $("<div class='input-group searchMoreRecipe col-md-12'>").append(newInput,newSpan)
        $(".moreOptions").append(newDiv)
    }
    var askEdamam = function(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            if (response) {
                $(".display").empty();  
                for (var j = 0; j < response.hits.length; j++) {
                    var data = response.hits[j].recipe 
                    console.log(data)
                    displayRecipes(data);        
                }
            }
            placeNewSearchBar();
        });
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
            var styleSearch= first === "American" ? "American diner":first;
            var styleSearch= styleSearch === "Mexican" ? "Mexican plate":styleSearch;
            
            $(".searchMoreRecipe").remove();

            displayRecipeHeader(first);  
            
            var queryURL = `https://api.edamam.com/search?q=${styleSearch}&app_id=${appID_edamam}&app_key=${apiKey_edamam}&from=0&to=3`
            
            askEdamam(queryURL);        
            
            $("#show-recipes").scrollView();
        })
    });
    
    $(".moreOptions").on("click","#search-more", function(){
        var input = $(".search-terms").val();
        if(input){ 
            $(".search-terms").val("");
            $(".searchMoreRecipe").remove();
            var querymoreURL = `https://api.edamam.com/search?q=${input}&app_id=${appID_edamam}&app_key=${apiKey_edamam}&from=0&to=3`
            
            askEdamam(querymoreURL);
            
            displayRecipeHeader(input)
            
            $("#show-recipes").scrollView();
        }
    })

})