

//StartHere();

textToSend(document.body.innerHTML);

/*I had a bunch of functions and files and a firebase login and i kept getting errors, dunno why, so i deleted most of it. so here's to failing. */
function StartHere()
{
  var articaleRef = firebaseConfig.database().ref('articales');
  articaleRef.child(document.URL).once('url', function(snapshot) {
    if (snapshot.exists()) {
      firebase.database().ref('users/' + 'url').set({
        sum: summary
      })

      chrome.runtime.sendMessage({
        action: "fill",
        title: document.title,
        source: document.URL,
        lastModified: document.lastModified,
        summary: sum
      });

      //alert('exists');
    }
    else{
      textToSend(document.body.innerHTML);
    }
  });


}
function updateDB(data)
{
  var json = JSON.parse(JSON.serialize(data));
  firebaseConfig.database().ref().set(json);
}

//https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
async function callAPI(enteredText) {
  await fetch(
    "https://intense-mesa-62220.herokuapp.com/https://private-api.smrzr.io/v1/summarize?num_sentences=5&algorithm=kmeans&min_length=100&max_length=500",
    {
      method: "POST",
      mode: "cors",
     
      headers: {
        api_token: "26154b5d-14d7-4fb8-8062-607a385ca92e",
      },
      body: JSON.stringify(enteredText), 
    }
  )
    .then((response) => response.json())
    .then((data) =>
      chrome.runtime.sendMessage({
        action: "fill",
        title: document.title,
        source: document.URL,
        lastModified: document.lastModified,
        summary: data,
      })
    );
}


function textToSend(html) {
  //const document1 = document;
  //const bodyNodes = document1.body.querySelectorAll("*");
  let doc = new DOMParser().parseFromString(html, "text/html");
  var massyNodes = doc.body;
  var enteredText = massyNodes.innerText;
  var enteredText = enteredText.replace(/<[^>]*>/g,);
  var enteredText = enteredText.replace(/[^\u0590-\u05FF]\w{2,} */g, );
  var enteredText = enteredText.replace(/ *\{[^}]*\} */gm, );
  var enteredText = enteredText.replace(/ *\[[^]]*\] */gm, );
  var enteredText = enteredText.replace(/ *\([^)]*\) */gm, );
  var enteredText = enteredText.replace(/ *\"[\s]*\" */gm, );
  var enteredText = enteredText.replace(/[^\u0590-\u05FF]\w{2,} */gm, );
  var enteredText = enteredText.replace(/<[^>]*>/g,);
  var enteredText = enteredText.replace(/ *\{[^}]*\} */gm, );
  var enteredText = enteredText.replace(/ *\[[^]]*\] */gm, );
  var enteredText = enteredText.replace(/ *\([^)]*\) */gm, );
  var enteredText = enteredText.replace(/ *\"[\s]*\" */gm, );

  var enteredText = enteredText.replace(/ *[a-zA-Z]+ */g, " ");
  var enteredText = enteredText.replace(/[^\u0590-\u05FF]\w{3,} */gm, );
  //var enteredText = enteredText.replace(
  //  / *[^.,:"''\u0590-\u05FF\s]* {1} */gm,
  //  " "
 //);
  var enteredText = enteredText.split(/\r\n|\r|\n/g); //array of substrings from innerText of document /\r\n|\r|\n/g
  
  callAPI(enteredText);
}