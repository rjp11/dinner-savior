$(document).ready(function(){
    $.fn.scrollView = function () {
        return this.each(function () {
          $('html, body').animate({
            scrollTop: $(this).offset().top
          }, 3000);
        });
      }
    $(".recipes-header").hide();
    $("#get-recipe").on("click", function(){
        event.preventDefault();
        var style = "korean"
        $("#dish-style").text(style);
        var apiKey = "3c5cf2a76798a4875b2063b8fb23d043"
        var appID = "ab462d6d"
        var queryURL = `https://api.edamam.com/search?q=${style}&app_id=${appID}&app_key=${apiKey}&from=0&to=3`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            if (response) {
                for (var j = 0; j < 3; j++) {
                    var data = response.hits[j].recipe
                    console.log(data)     

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
                console.log(ingreData)
                for(var i = 0; i < ingreData.length; i++){
                    var li = $("<li>").text(ingreData[i]);
                    ingre.append(li);
                }
                var servings= $("<p>").text("Servings: "+data.yield);              
                var right = $("<div class='col-md-6 pull-left'>").append(name,ingreTitle,ingre,servings,link)

                newDiv.append(left,right)
                $(".display").append(newDiv);          
                }
            }
        });
        $(".recipes-header").show();
        $("#show-recipes").scrollView();
    })
})