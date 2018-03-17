let config = {
    apiKey: "AIzaSyBakOLH_KeVPHTZhhoKid2E5t65vXeyIl4",
    authDomain: "train-scheduler-92c2c.firebaseapp.com",
    databaseURL: "https://train-scheduler-92c2c.firebaseio.com",
    projectId: "train-scheduler-92c2c",
    storageBucket: "train-scheduler-92c2c.appspot.com",
    messagingSenderId: "434923772578"
    };
    firebase.initializeApp(config);
let database = firebase.database();
let name = "";
let dest = "";
let time = "";
let freq = "";

$("#submitBtn").on("click", function(){
    event.preventDefault();
    
    let name = $('#name').val().trim(); 
    let dest = $('#dest').val().trim(); 
    let time = $('#time').val().trim();
    let freq = $('#freq').val().trim();

    let newTrain = {
        newName: name,
        newDest: dest,
        newTime: time,
        newFreq: freq
    }

    
    database.ref().push(newTrain);

    alert("Train data added");

    $("#name").val("");
    $("#dest").val("");
    $("#time").val("");
    $("#freq").val("");
        
    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    let name = childSnapshot.val().newName;
    let dest = childSnapshot.val().newDest;
    let freq = childSnapshot.val().newFreq;
    let time = childSnapshot.val().newTime;

    let firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
    let currentTime = moment();
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % freq;
    let tMinutesTillTrain = freq - tRemainder;
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
})
