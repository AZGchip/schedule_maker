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
var hr;
var mn;
var pt;
const timeOpt = {
  hour12: false,
  hour: "numeric",
  }
const timeOpt2 = {
  hour12: false,
  minute:"numeric"
}
var timeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var minArray = [0,15,30,45]
var d;
var timeKeep = setInterval(computeTimer, 1000);
nodelay()

function computeTimer() {
  hr = new Date().toLocaleTimeString("en-US",timeOpt)
  mn = new Date().toLocaleTimeString("en-US",timeOpt2)
  $("#miltime").html(hr)
  
  timecolorchanger()
  
  
}

function displayTimer() {
  d = new Date();
  $("#timebox").html(d.toLocaleTimeString())
  $("#datebox").html(d.toLocaleDateString())
}
function nodelay(){
  hr = new Date().toLocaleTimeString("en-US",timeOpt)
  mn = new Date().toLocaleTimeString("en-US",timeOpt2)
  pt = hr
  timecolorchanger()
  $("#miltime").html(hr)
}

function timecolorchanger(){
  for (var i = 0; i < timeArray.length; i++) {
    var id = timeArray[i].toString();
    if(timeArray[i]< hr){
    $(`#${id}`).css("background-color","grey")
    }
    else if(timeArray[i] > hr){
      $(`#${id}`).css("background-color","green")
    }
    else{
      for (var m = 0; m < minArray.length; m++) {
        var minClass =minArray[m].toString();
        if (mn < minArray[m]){
          $(`#${id} .${minClass}`).css("background-color","green")
        }
        else if (mn >= minArray[m]&& mn <= minArray[m]+ 15){
          $(`#${id} .${minClass}`).css("background-color","red")
        }
        else{
          $(`#${id} .${minClass}`).css("background-color","grey")
        }
      }
      
    }
  }
}