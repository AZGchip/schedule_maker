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
//changes color based on time
function timecolorchanger() {
  for (var i = 0; i < timeArray.length; i++) {
    var id = timeArray[i].toString();
    //if selected time equals hour set color to blue
     if(timeArray[i] == hr){
      $(`#${id}t`).css("background-color", "#1893E7")

// changes bar progress
      for (var m = 0; m < minArray.length; m++) {
        var minClass = minArray[m].toString();
        //green
        if (mn < minArray[m]) {
          $(`#${id} .${minClass}`).css("background-color", "#82CB34")
        }
        //yellow
        else if (mn >= minArray[m] && mn < minArray[m] + 14) {
          $(`#${id} .${minClass}`).css("background-color", "#D1D12E")
        }
        //red/grey
        else {
          $(`#${id} .${minClass}`).css("background-color", "#B2654D")
        }
      }
    }
    else if (timeArray[i] > hr) {
      $(`#${id}t`).css("background-color", "#82CB34")
      $(`#${id}`).css("background-color", "#82CB34")
    }
    else{
      $(`#${id}t`).css("background-color", "grey")
      $(`#${id}`).css("background-color", "#B2654D")
    }
    
    

  }
}
function pagebuild(){
  for (var b = 0;b < timeArray.length; b++) {
    var storageNum = toString(timeArray[b]);
    var formfill = localStorage.getItem(storageNum);
    var inputbutton = $(`<div class="savebutton col-md-1 btn btn-warning mh-100"> add event button</div>`)
    $(inputbutton).attr("value",timeArray[b])
    $("#fillbox").append(`
    <div class="row time ">
    <div class="col-md-10  m-2 rounded bg-secondary border border-secondary">
        <div class="row  border border-dark rounded" id="${timeArray[b]}">
            <div class="0 col-sm-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="15 col-sm-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="30 col-sm-3 text-center bar rounded-right border-right border-dark"></div>
            <div class="45 col-sm-3 text-center bar rounded-right "></div>
        </div>
        <div class="row" >
            <h5 id="${timeArray[b]}t" class=" col-sm-4 text-center mh-100 mb-0  title rounded">${twelveTime[b]}</h5>
        </div>
        <div class="row" id="${timeArray[b]}f">
            <input class="formbox col-md-11 bg-secondary border-secondary rounded" type="text" value="${formfill}">
           
        </div>
    </div>
</div>
`)
  $(`#${timeArray[b]}f`).prepend(inputbutton)  
  }
  //
$(".savebutton").on("click", function(){
  var saveValue = $(this).attr("value");
   
  var formContent =$(`#${saveValue}f .formbox`).val();
  console.log(formContent);
  console.log(saveValue);
  saveToLocal(saveValue,formContent)
})
}
// Saves to local storage
function saveToLocal(val,content){
localStorage.setItem(val,content);
console.log(localStorage.getItem(val))

}
