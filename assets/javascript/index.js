$("#search").on("click", function (event) {
    $("#Possible-matches").empty();
    event.preventDefault();
    var search = $("#search-input").val().trim();
    localStorage.clear();
    localStorage.setItem("search", search);
    location.href = "restaurant-search.html";
});