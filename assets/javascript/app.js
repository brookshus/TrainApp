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
  
  //target our form id, if we press the button or hit enter our form will be submitted
  $("#train-form").on("submit", function(event) {
        event.preventDefault();
        console.log("submitted");
       
        
        trainName = $("#InputTrainName").val().trim();
        destination = $("#InputDestination").val().trim();
        frequency = $("#InputTrainFrequency").val().trim();
        nextArrival = $("#InputTrainTime").val().trim(); 
  
        db.ref().push({
          TrainName: trainName,
          Destination: destination,
          Frequency: frequency,
          NextArrival: nextArrival,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  
      });
  
      db.ref().on("child_added", function(snapshot){
          var sv = snapshot.val();
          console.log( sv);
          // console.log(sv);
          

  
          // currently there are different types of data in ur db
          // temp fix is just checking data type, and moving code inside if statement
          if(typeof sv === "object"){
            console.log(sv)
            // created a variable to capture incoming data from db into our table
            var newRow = $("<tr>").append(
              $("<td>").text(sv.Frequency),
              $("<td>").text(sv.Destination),
              $("<td>").text(sv.TrainName),
              $("<td>").text(sv.dateAdded),
            );
            console.log("new row", newRow)
            //use the id on tbody to append our new row
            $("#trains-here").append(newRow)
  
            var trainTimeConverted = moment(nextArrival, "HH:mm");

            var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
  
            console.log(timeDifference);
            
  
            var frequencyMinutes = childSnapshot.val().frequency;
  
            console.log("Frequency Minutes: " + frequencyMinutes);
            
            var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  
            console.log("Minutes Away: " + minutesAway);
            
            var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
  
            console.log("Next Arrival: " + nextArrival);
            
            // $("#InputTrainName").text(sv.employeeName);
            // $("#InputDestination").text(sv.companyRole);
            // $("#InputTrainTime").text(sv.startDate);
            // $("#InputTrainFrequency").text(sv.monthlyRate); 
          }
        
  
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