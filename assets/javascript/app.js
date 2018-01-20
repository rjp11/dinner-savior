//THE FOLLOWING JAVASCRIPT IS FOR THE NAVBAR

//THE FOLLOWING JAVASCRIPT IS FOR THE INDEX.HTML PAGE
$("#login-logout").on("click", function (event) {
    location.href = "login.html";
});

//THE FOLLOWING JAVASCRIPT IS FOR THE LOGIN PAGE
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCpYPP827KmYgJ4kF1Yfiw6hoW0FBwRFWI",
        authDomain: "dinnersavior.firebaseapp.com",
        databaseURL: "https://dinnersavior.firebaseio.com",
        projectId: "dinnersavior",
        storageBucket: "dinnersavior.appspot.com",
        messagingSenderId: "297576795204"
    };
    firebase.initializeApp(config);

    const txtEmail = $("#inputEmail");
    const txtPassword = $("#pwd");
    const btnLogin = $(".signIn");
    const btnSignUp = $(".signUp");
    const btnLogout = $(".signOut");

    var validateEmail = function () {
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(txtEmail.val())) {
            $(".alert").text("");
        } else {
            $(".alert").text("email address is not valid");
        };
    }

    btnLogin.on("click", function () {
        event.preventDefault();
        validateEmail();
        const email = txtEmail.val()
        const pass = txtPassword.val()
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(function (e) {
            console.log(e.message);
            $(".alert").text(e.message);
        });

    })

    btnSignUp.on("click", function () {
        event.preventDefault();
        validateEmail();
        const email = txtEmail.val()
        const pass = txtPassword.val()
        const auth = firebase.auth();
        if (firebaseUser) {
            $(".alert").text("user already exists, please login");
        }
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
        console.log(promise)
    })

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $(".signOut").removeClass("hide");
        } else {
            console.log("not logged in")
            $(".signOut").addClass("hide");
        }
    });

    btnLogout.one("click", function (e) {
        event.preventDefault();
        firebase.auth().signOut();
    })
});

//THE FOLLOWING JAVASCRIPT IS FOR THE RESTAURANT SEARCH/GOOGLE API

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
                    selectButton.attr("data-rating",result[i].rating);
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
    name : $(this).attr("data-name"),
    rating: $(this).attr("data-rating"),
    address: $(this).attr("data-address")
    }
    console.log(selectResult)
});

//THE FOLLOWING JAVASCRIPT IS FOR THE WAIT-INPUT.HTML PAGE
//This code utilizes firebase to display the most recent wait time for the selected restaurant
//and allows users to input their party size and wait time

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCitT0ot2ltK4HGubAVgPa4vup90VfXTEE",
    authDomain: "dinner-savio.firebaseapp.com",
    databaseURL: "https://dinner-savio.firebaseio.com",
    projectId: "dinner-savio",
    storageBucket: "dinner-savio.appspot.com",
    messagingSenderId: "69909255571"
};
firebase.initializeApp(config);
var database = firebase.database();

// TO DO: update the next two lines to reference the restaurant from Google Places API
var currentCity = "chicago"; //can change this to take the value of the tab selected
var currentRest = "little goat" //will be the name of the restaurant from Google Places API

$("#selected-restaurant").text(currentRest);

//sends the user input for the current restaurant to Firebase
$("#add-wait-time").on("click", function (event) {
    event.preventDefault();

    //stores user's reported party size and wait time with a stime stamp
    var userInput = {
        "partySize": $("#party-size").val().trim(),
        "waitTime": $("#quoted-wait").val().trim(),
        "time": Date.now()
    };
    database.ref('restaurants/' + currentCity + '/' + currentRest).set(userInput);
    $("#party-size").val("");
    $("#quoted-wait").val("");
});

//prints the most recent quoted wait times from Firebase to the DOM
database.ref('restaurants/' + currentCity + '/' + currentRest).on("value", function (snapshot) {
    var partySize = snapshot.val().partySize;
    var waitTime = snapshot.val().waitTime;
    var time = moment(snapshot.val().time).format('MMMM Do YYYY, h:mm a');

    //TO DO:insert for loop to check that another user has previously entered

    $("#reported-party-size").text(partySize);
    $("#reported-wait-time").text(waitTime);
    $("#entry-time").text(time);
});

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