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

// TO DO: update the next three lines to reference the restaurant from Google Places API
var currentCity = "chicago"; //can change this to take the value of the tab selected
var currentRest = "publican" //will be the name of the restaurant from Google Places API
$("#selected-restaurant").text(currentRest);

//sends the user input for the current restaurant to Firebase
$("#add-wait-time").on("click", function (event) {
    event.preventDefault();
    var userInput = {
        "partySize": $("#party-size").val().trim(),
        "waitTime": $("#quoted-wait").val().trim(),
        "time": Date.now()
    };
    database.ref(currentCity + '/restaurants/' + currentRest).set(userInput);
    $("#party-size").val("");
    $("#quoted-wait").val("");
});

//prints the most recent quoted wait times from Firebase to the DOM
database.ref(currentCity + '/restaurants/' + currentRest).on("value", function (snapshot) {
    var partySize = snapshot.val().partySize;
    var waitTime = snapshot.val().waitTime;
    var time = moment(snapshot.val().time).format('MMMM Do YYYY, h:mm:ss a');
    
    //TO DO:insert for loop to check that another user has previously entered
    
    $("#reported-party-size").text(partySize);
    $("#reported-wait-time").text(waitTime);
    $("#entry-time").text(time);
});