'use strict';

var imported = document.createElement('script');
imported.src ='https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
document.head.appendChild(imported);

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   $.ajax({
//     	method: "POST",
//         url: "http://0.0.0.0:8081/try",
//         data: { percentageS: 51 }
//     }).then(function(data) {
//     	if(data.percentageSentiment>50){
//     		document.getElementById("sentiment").innerHTML = "Republic";
//     	}
//     });
// });

chrome.browserAction.onClicked.addListener(function(tab) {
var curr_url;
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
        curr_url = tabs[0].url;
        httpGetAsync('https://mercury.postlight.com/parser?url='+curr_url);
        //alert(textToSend);
   }
);

function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var json = JSON.parse(this.responseText);
            callTheAPI(json.content);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-Type','application/json');
    xmlHttp.setRequestHeader('x-api-key','GZ27oVFMPATQWs49ONzCJELnQvRouVt47pJQLmPq');
    xmlHttp.send(null);
}

 function callTheAPI(textToSend){ 
  var data = JSON.stringify({
  "text": textToSend
});
var percentBias=0;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    alert(this.responseText);
    //percentBias=json.percentageSentiment;
  }
});
//alert(data);
xhr.open("POST", "http://ec2-18-220-130-31.us-east-2.compute.amazonaws.com/gettype");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
}

// if(percentBias>50){
//     alert("Republican");
// }
// else {alert("Democrat");}
//alert(data);
});

// This block is new!
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );


// //chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { insertDictionaryScript();});

// chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
//   $.ajax({
//     	method: "POST",
//         url: "http://0.0.0.0:8081/try",
//         data: { percentageS: 51 }
//     }).then(function(data) {
//     	if(data.percentageSentiment>50){
//     		document.getElementById("sentiment").innerHTML = "Republic";
//     	}
//     });
// });

// //chrome.browserAction.setBadgeText({text: 'Van'});

console.log('\' Hello \' World! Event Page for Browser Action');
