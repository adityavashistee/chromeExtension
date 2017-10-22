//var firstHref = $("a[href^='http']").eq(0).attr("href");

//console.log(firstHref);

//alert("Hello from your Chrome extension!")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);

//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {    window.console.log('updated from contentscript');  });