$(document).ready(function(){
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

    var validateEmail = function(){
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(txtEmail.val())){
            $(".alert").text("");
        } else {
            $(".alert").text("email address is not valid");
        };
    }

    btnLogin.on("click",function(){
        event.preventDefault();
        validateEmail();
        const email = txtEmail.val()
        const pass = txtPassword.val()
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(function(e){
            console.log(e.message);
            $(".alert").text(e.message);
        });
        
    })

    btnSignUp.on("click",function(){
        event.preventDefault();
        validateEmail();
        const email = txtEmail.val()
        const pass = txtPassword.val()
        const auth = firebase.auth();
        if(firebaseUser){
            $(".alert").text("user already exists, please login");
        }
        const promise = auth.createUserWithEmailAndPassword(email,pass);
        promise.catch(e=>console.log(e.message))
        console.log(promise)
    })

    firebase.auth().onAuthStateChanged(firebaseUser=>{
        if(firebaseUser){
            console.log(firebaseUser);
            $(".signOut").removeClass("hide");
        } else {
            console.log("not logged in")
            $(".signOut").addClass("hide");
        }
    });

    btnLogout.one("click",function(e){
        event.preventDefault();
        firebase.auth().signOut();
    })  
});
