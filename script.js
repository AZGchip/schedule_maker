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
var mt;
var pt;
const timeOpt = {
  hour12: false,
  hour: "numeric",
  }

var timeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var d;
var timeKeep = setInterval(computeTimer, 1000);
nodelay()

function computeTimer() {
  mt = new Date().toLocaleTimeString("en-US",timeOpt)
  $("#miltime").html(mt)
  if(pt !== mt){
  timecolorchanger()
  pt = mt;
  }
}

function displayTimer() {
  d = new Date();
  $("#timebox").html(d.toLocaleTimeString())
  $("#datebox").html(d.toLocaleDateString())
}
function nodelay(){
  mt = new Date().toLocaleTimeString("en-US",timeOpt)
  pt = mt
  timecolorchanger()
  $("#miltime").html(mt)
}

function timecolorchanger(){
  for (var i = 0; i < timeArray.length; i++) {
    var id = "#"+timeArray[i].toString();
    if(timeArray[i]< mt){
    $(id).css("background-color","grey")
    }
    else if(timeArray[i] > mt){
      $(id).css("background-color","green")
    }
    else{
      $(id).css("background-color","red")
    }
  }
}