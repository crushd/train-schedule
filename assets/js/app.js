var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainFirstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#train-frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train schedule data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: trainFirstTime,
      frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref('choochoo').push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    alert("Train schedule successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-time-input").val("");
    $("#train-frequency-input").val("");
  });
  
  
  database.ref('choochoo').on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
  
    // Prettify the train first start
    var trainFirstPretty = moment.unix(trainFirstTime).format("HH:mm");
  

        // First Time (pushed back 1 year to make sure it comes before current time)
        //var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(trainFirstPretty);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(trainFirstPretty), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var trainRemainder = diffTime % trainFrequency;
        console.log(trainRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFrequency - trainRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(empStart, "X"), "months");
    //console.log(empMonths);
  
    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
  });