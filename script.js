//military time 9am to 6pm. empty strings for user input
var schedule = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
}
var timeKeep = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
$("#timebox").html(d.toLocaleTimeString())
}