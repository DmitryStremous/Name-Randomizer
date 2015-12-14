(function(){
  var data = null,
      cache = [],
      button = document.getElementById("btn"),
      output = document.getElementById("output"),
      xhttp = "";

  if (document.addEventListener) {
    button.addEventListener("click", btnClick);
  } else if (document.attachEvent) {                 // For IE 8 and earlier versions
    button.attachEvent("onclick", btnClick);
  }

  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");  // For IE6, IE5
  }
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      data = JSON.parse(xhttp.responseText);
    }
  };
  xhttp.open("GET", "data/data.json", true);
  xhttp.send();

  function btnClick() {
    output.innerHTML = randomizer();
  }
  function getRandomIndex(arr) {
    return Math.floor(Math.random()*arr.length);
  }
  function makeFirstLetterUp (s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  }
  function randomizer() {
    var result = "",
        noun = "",
        adj = "";

    noun = data["nouns"][getRandomIndex(data["nouns"])];
    adj = data["adjectives"][getRandomIndex(data["adjectives"])];
    result = makeFirstLetterUp(adj) + makeFirstLetterUp(noun);

    if (cache.length != 0) {
      for (var i = 0, len = cache.length; i < len; i++) {
        if (cache[i] === result)
          return randomizer();
      }
    }

    cache.push(result);
    if (cache.length == 11)
      cache.shift();
    return result;
  }
})();