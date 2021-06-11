
function showIcon() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("summaryContent").style.display = "none";
}
function hideIcon() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("summaryContent").style.display = "block";
}

//runtime.getBackgroundPage(callback: function)
document.addEventListener("DOMContentLoaded", function () {
  showIcon();
  chrome.extension
    .getBackgroundPage()
    .chrome.tabs.executeScript({ file: "payload.js" });
});
// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
  console.log(message);
  if (message.action === "fill") {
    hideIcon();
    //document.getElementById("pageTitle").innerHTML = message.title;
   // document.getElementById("pageSource").innerHTML = message.source;
    //document.getElementById("lastModified").innerHTML = message.lastModified;
    document.getElementById("summaryContent").innerHTML =
      message.summary.summary;
  }
});
