
window.addEventListener("load", function() {
  chrome.extension.sendMessage({
      type: "dom-loaded", 
      data: {
          myProperty: "value"
      }
  });
}, true);

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "REPLACE_TEXT") {
    const find = message.find;
    const replaceWith = message.replace;
    const regex = new RegExp(find, "g");
    
    //String s = var allLinks = document.getElementsByTagName('*'); 
    //var str = document.body.innerText.replace(/\\s*/g, ' ');
    //bar str = document.body.innerText.replace(/\\s*/g, ' ');
    //var str = document.body.innerText.replace(/</?[a-zA-Z0-9]+>|<[a-zA-Z0-9]+\\s*/>|\r?\\n/g,' ');
    
    const contents = document.querySelectorAll(
      "p,span,h1,h2,h3,h4,h5,h6"
    );
    contents.forEach( snippet => snippet.textContent = snippet.textContent.replace(regex, replaceWith));
  }


});
/*
The methods getElementsByClassName and getElementsByTagName return an HTMLCollection object that acts like an array. 
That collection is "live", which means the collection is updated 
if additional elements with tag name or class name are added to the document.
var teamMembers = document.getElementsByClassName("team-member");
for (var i = 0; i < teamMembers.length; i++) {
   console.log(teamMembers[i].innerHTML);
}


The method querySelectorAll() returns a NodeList, which also acts like an array. 
That list is "static", which means that the list won't update even if new matching elements are added to the page.
Most likely, you won't run into the difference between the two return data types when you're using these methods, 
but it's good to keep in mind.

var teamMembers = document.querySelectorAll(".team-member");
for (var i = 0; i < teamMembers.length; i++) {
   console.log(teamMembers[i].innerHTML);
}
*/
/*
function replaceText(find, replace){
    const regex = new RegExp(find, "gi");

    const contents = document.querySelectorAll('p,li,span,h1,h2,h3,h4,h5,h6');

    for(const snippet of contents){
        snippet.textContent = snippet.textContent.replace(regex, replace);
    }
}
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
chrome.runtime.onMessage.addListener(function(message){
    if(message.action === 'REPLACE_TEXT'){
        replaceText(message.find, message.replace);
    }
});
*/
//const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
/*for (let i=0; i<text.length; i++){

    if(text[i].innerHTML.includes('קורונה')){
        text[i].innerHTML=text[i].innerHTML.replace('קורונה','ציפים')
}

    else if(text[i].innerHTML.includes('חיסונים'))
        text[i].innerHTML=text[i].innerHTML.replace('חיסונים','שקרים')
        
    
}*/
//in manifest add the name of this js file to "js", so it will be executed when "matches" are met.
/*
const FIND = "the";
const REPLACE_WITH = "replacely";
const regex = new RegExp(FIND, "gi");
const contents = document.querySelectorAll('p,li,span,h1,h2,h3,h4,h5,h6');
for(const snippet of contents){
    snippet.textContent = snippet.textContent.replace(regex, REPLACE_WITH);
}
*/
