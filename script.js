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
  minute: "numeric"
}
var timeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var twelveTime =["9:00am","10:00 am","11:00 am","12:00 pm","1:00 pm","2:00 pm","3:00 pm","4:00 pm","5:00 pm","6:00 pm"]
var minArray = [0, 15, 30, 45]
var d;
var timeKeep = setInterval(computeTimer, 5000);
nodelay()

function computeTimer() {
  hr = new Date().toLocaleTimeString("en-US", timeOpt)
  mn = new Date().toLocaleTimeString("en-US", timeOpt2)
  

  timecolorchanger()


}

function displayTimer() {
  d = new Date();
  $("#timebox").html(d.toLocaleTimeString())
  $("#datebox").html(d.toLocaleDateString())
}
function nodelay() {
  hr = new Date().toLocaleTimeString("en-US", timeOpt);
  mn = new Date().toLocaleTimeString("en-US", timeOpt2);
  pt = hr;
  pagebuild();
  timecolorchanger();
  
}

function timecolorchanger() {
  for (var i = 0; i < timeArray.length; i++) {
    var id = timeArray[i].toString();
    if (timeArray[i] < hr) {
      $(`#${id}t`).css("background-color", "grey")
      $(`#${id}`).css("background-color", "grey")
    }
    else if (timeArray[i] > hr) {
      $(`#${id}t`).css("background-color", "green")
      $(`#${id}`).css("background-color", "green")
    }
    else {
      $(`#${id}t`).css("background-color", "red")


      for (var m = 0; m < minArray.length; m++) {
        var minClass = minArray[m].toString();
        if (mn < minArray[m]) {
          $(`#${id} .${minClass}`).css("background-color", "green")
        }
        else if (mn >= minArray[m] && mn <= minArray[m] + 15) {
          $(`#${id} .${minClass}`).css("background-color", "red")
        }
        else {
          $(`#${id} .${minClass}`).css("background-color", "grey")
        }
      }
    }

  }
}
function pagebuild(){
  for (var b = 0;b < timeArray.length; b++) {
    $("#fillbox").append(`
    <div class="row time">
    <div class="col-md-10  m-2 rounded ">
        <div class="row  border-right" id="${timeArray[b]}">
            <div class="0 col-sm-3 text-center bar">
            </div>
            <div class="15 col-sm-3 text-center bar ">
            </div>
            <div class="30 col-sm-3 text-center bar ">
            </div>
            <div class="45 col-sm-3 text-center bar ">
            </div>
        </div>
        <div class="row" >
            <h5 id="${timeArray[b]}t" class=" col-sm-4 text-center border-right title">${twelveTime[b]}</h5>
        </div>
        <div class="row">
            <div class="col-md-11">text here</div>
            <div class="col-md-1 btn btn-warning mh-100"> add event button</div>
        </div>
    </div>
</div>
`)
    
  }
}