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
    var partySize = $("#party-size").val().trim();
    var waitTime = $("#quoted-wait").val().trim();

    if (partySize > 0 && partySize < 13 && isNaN(`${waitTime}`) === false) {
        //stores user's reported party size and wait time with a stime stamp
        var userInput = {
            "partySize": partySize,
            "waitTime": waitTime,
            "time": Date.now()
        };

        database.ref('restaurants/' + currentCity + '/' + currentRest).set(userInput);
        $("#party-size").val("");
        $("#quoted-wait").val("");

    } else {
        $(".modal").style.display = "block";
    };

});

//prints the most recent quoted wait times from Firebase to the DOM
database.ref('restaurants/' + currentCity + '/' + currentRest).on("value", function (snapshot) {
    var partySize = snapshot.val().partySize;
    var waitTime = snapshot.val().waitTime;
    var time = moment(snapshot.val().time).format('MMMM Do YYYY, h:mm a');


    $("#reported-party-size").text(partySize);
    $("#reported-wait-time").text(waitTime);
    $("#entry-time").text(time);
});