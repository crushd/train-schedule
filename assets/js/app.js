var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    let startDate = moment().subtract(1,"year").format("YYYY-MM-DD");
    let startTime = $("#first-train-time-input").val().trim();
    let startDateTime = moment(startDate + " " + startTime);

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainFirstTime = moment(startDateTime).format("YYYY-MM-DD HH:mm");
    var trainFrequency = $("#train-frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train schedule data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: trainFirstTime,
      frequency: trainFrequency
    };

    // Uploads train schedule data to the database
    database.ref('choochoo').push(newTrain);
  
    //Logs everything to console
    //console.log(newTrain.name);
    //console.log(newTrain.destination);
    //console.log(newTrain.firstTime);
    //console.log(newTrain.frequency);
  
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
  
    // Prettify the train first start
    var trainFirstPretty = moment(trainFirstTime).format("YYYY-MM-DD HH:mm");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstPretty), "minutes");

    // Time apart (remainder)
    var trainRemainder = diffTime % trainFrequency;

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - trainRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("MMM DD, YYYY HH:mm")),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
  });