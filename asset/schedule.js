
var config = {
  apiKey: "AIzaSyC7bjfcCJecGDaRX_5zwUHb82zygyXReWU",
  authDomain: "train-time-schedule-67028.firebaseapp.com",
  databaseURL: "https://train-time-schedule-67028.firebaseio.com",
  projectId: "train-time-schedule-67028",
  storageBucket: "",
  messagingSenderId: "627323389602"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var train_name = $("#name-input").val().trim();
  var train_destination = $("#desti-input").val().trim();
  var train_freq = $("#freq-input").val().trim();
  var temp = $("#start-input").val().trim();
  var train_start = moment(temp , "hh:mm");
  console.log(0);
  var currentTime = moment();
  console.log(1);
  var diff = currentTime.diff(train_start, "minutes");
  console.log(diff);
  var remain = diff%train_freq;
  var time_till_arrive =  train_freq - remain;
  var next_train = moment().add(time_till_arrive, "minutes");
  console.log(train_start)
  var new_train = {
    name: train_name,
    desti: train_destination,
    // start: train_ start,
    freq: train_freq,
    next: moment(next_train).format("hh:mm"),
    minutes: time_till_arrive
  };
  console.log(12345)
  // Uploads employee data to the database
  database.ref().push(new_train);

  // Logs everything to console
  console.log(new_train.name);
  console.log(new_train.desti);
  console.log(new_train.start);
  console.log(new_train.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#desti-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train_name = childSnapshot.val().name;
  var train_destination = childSnapshot.val().desti;
  var train_start = childSnapshot.val().start;
  var train_freq = childSnapshot.val().freq;
  var train_next = childSnapshot.val().next;
  var train_minute = childSnapshot.val().minutes;

  // Employee Info
  console.log(train_name);
  console.log(train_destination);
  console.log(train_start);
  console.log(train_freq);

  
  // Add each train's data into the table
  $("#employee-table > tbody")
  .append("<tr><td>" + train_name + "</td><td>" + train_destination + "</td><td>" +
    train_freq + "</td><td>" + train_next + "</td><td>" + train_minute + "</td></tr>");
});
