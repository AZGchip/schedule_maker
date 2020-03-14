//globalvariables
var hr;
var mn;
var pt;
var d;
var time12;
//date 
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
//builds and displays date
today = mm + '/' + dd + '/' + yyyy;
$("#datehere").text(today);
// 24hr hours
const timeOpt = {
  hour12: false,
  hour: "numeric",
}
//24hr minutes
const timeOpt2 = {
  hour12: false,
  minute: "numeric",
}
const timeOpt3 = {
  hour12: true,
  hour: "numeric",
  minute: "2-digit",
}
//arrays for 24hr time,time strings for page building , and array for progress bar
var timeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var twelveTime = ["9:00am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"]
var minArray = [0, 15, 30, 45]
var timeKeep = setInterval(computeTimer, 5000);
//called on page load
nodelay()
//updates time variables every second
function computeTimer() {
  hr = new Date().toLocaleTimeString("en-US", timeOpt);
  mn = new Date().toLocaleTimeString("en-US", timeOpt2);
  time12 = new Date().toLocaleTimeString("en-US", timeOpt3);
  $("#timehere").text(time12);
  timecolorchanger();
}
//sets HR and MN on startup then calls Pagebuild() and Timecolorchanger()
function nodelay() {
  hr = new Date().toLocaleTimeString("en-US", timeOpt);
  mn = new Date().toLocaleTimeString("en-US", timeOpt2);
  time12 = new Date().toLocaleTimeString("en-US", timeOpt3);
  $("#timehere").text(time12);
  pagebuild();
  timecolorchanger();
}
//changes color based on time
function timecolorchanger() {
  for (var i = 0; i < timeArray.length; i++) {
    var id = timeArray[i].toString();
    //if selected time equals hour set color to blue
    if (timeArray[i] == hr) {
      $(`#${id}t`).css("background-color", "#1893E7");

      // changes bar progress
      for (var m = 0; m < minArray.length; m++) {
        var minClass = minArray[m].toString();
        //green
        if (mn < minArray[m]) {
          $(`#${id} .${minClass}`).css("background-color", "#82CB34");
        }
        //yellow
        else if (mn >= minArray[m] && mn < minArray[m] + 14) {
          $(`#${id} .${minClass}`).css("background-color", "#D1D12E");
        }
        //red/grey
        else {
          $(`#${id} .${minClass}`).css("background-color", "#B2654D");
        }
      }
    }
    //green
    else if (timeArray[i] > hr) {
      $(`#${id}t`).css("background-color", "#82CB34");
      $(`#${id}`).css("background-color", "#82CB34");
    }
    else {
      $(`#${id}t`).css("background-color", "grey");
      $(`#${id}`).css("background-color", "#B2654D");
    }
  }
}
//builds page using format. sets button values 
function pagebuild() {
  var formfill;
  for (var b = 0; b < timeArray.length; b++) {
    var storageNum = timeArray[b];
    if (localStorage.getItem(storageNum) !== null) {
      formfill = localStorage.getItem(storageNum);
    }
    else {
      formfill = "";
    }
    //input and clear buttons 
    var inputbutton = $(`<div class="savebutton col-md-12 btn  mt-2 ">Add</div>`);
    var clearbutton = $(`<div class="clearbutton col-md-12 btn mt-2 ">Clear</div>`);
    $(inputbutton).attr("value", timeArray[b]);
    $(clearbutton).attr("value", timeArray[b]);
    $("#fillbox").append(`
    <div class="row time ">
    <div class="col-md-10  m-2 rounded bg-secondary border border-secondary mx-auto">
        <div class="row  border border-dark rounded" id="${timeArray[b]}">
            <div class="0 col-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="15 col-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="30 col-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="45 col-3 text-center bar rounded-right "></div>
        </div>
        <div class="row" >
            <h5 id="${timeArray[b]}t" class=" col-sm-4 text-center mh-100 mb-0  title rounded">${twelveTime[b]}</h5>
        </div>
        <div class="row" id="${timeArray[b]}f">
            <textarea class="formbox col-sm-10 bg-secondary border-dark rounded mx-auto" type="text" cols="40" rows="5" value="">${formfill}</textarea>
           <div class="buttons col-md-2">
           
           </div>
        </div>
    </div>
</div>
`)
    //appends buttons to class inside of an id
    $(`#${timeArray[b]}f .buttons`).append(inputbutton);
    $(`#${timeArray[b]}f .buttons`).append(clearbutton);
  }
  //on click calls save to local function
  $(".savebutton").on("click", function () {
    var saveValue = $(this).attr("value");
    var formContent = $(`#${saveValue}f .formbox`).val();
    //sends SAVEVALUE and FORMCONTENT to save to local function
    saveToLocal(saveValue, formContent)
    //css effects on button click
    $(`#${saveValue}f .savebutton`).text("Saved!");
    $(`#${saveValue}f .savebutton`).css("background-color", "green");
    setTimeout(function () {
      $(`#${saveValue}f .savebutton`).css("background-color", "#82CB34");
      $(`#${saveValue}f .savebutton`).text("Add");
    }, 1000);
  })
  //sends a blank string to saveto local to "clear" save. empties text area
  $(".clearbutton").on("click", function () {
    var saveValue = $(this).attr("value");
    var formContent = "";
    saveToLocal(saveValue, formContent)
    //css effects when clicked
    $(`#${saveValue}f .clearbutton`).text("Cleared!");
    $(`#${saveValue}f .clearbutton`).css("background-color", "white");
    $(`#${saveValue}f .clearbutton`).css("color", "black");
    $(`#${saveValue}f .formbox`).val("");
    setTimeout(function () {
      $(`#${saveValue}f .clearbutton`).css("background-color", "#B2654D");
      $(`#${saveValue}f .clearbutton`).text("Clear");
    }, 1000);
  })
}
// Saves to local storage
function saveToLocal(val, content) {
  localStorage.setItem(val, content);
}
