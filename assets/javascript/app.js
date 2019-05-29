$(document).ready(function(){

var config = {
    apiKey: "AIzaSyAK8sFydjgqXsZ_pTw5cv9pUGAPQSV82AM",
    authDomain: "train-schedule-d6432.firebaseapp.com",
    databaseURL: "https://train-schedule-d6432.firebaseio.com",
    projectId: "train-schedule-d6432",
    storageBucket: "train-schedule-d6432.appspot.com",
   // messagingSenderId: "409879164947",
   // appId: "1:409879164947:web:e625b3cdb5b74fcb"
  }; 

firebase.initializeApp(config);

var db = firebase.database();
console.log(db);
// Initial Values
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival = ""; 

$("#submit").on("click", function(event) {
      event.preventDefault();
      
      trainName = $("#InputTrainName").val().trim();
      destination = $("#InputDestination").val().trim();
      frequency = $("#InputTrainTime").val().trim();
      nextArrival = $("#InputTrainFrequency").val().trim(); 

      database.ref().push({
        TrainName: trainName,
        Destination: destination,
        Frequency: frequency,
        Frequency: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    database.ref().on("child_added", function(snapshot){
        var sv = snapshot.val();
        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.frequency);
        console.log(sv.nextArrival); 

      $("#InputTrainName").text(sv.employeeName);
      $("#InputDestination").text(sv.companyRole);
      $("#InputTrainTime").text(sv.startDate);
      $("#InputTrainFrequency").text(sv.monthlyRate); 

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

      var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});
      
    });

})
