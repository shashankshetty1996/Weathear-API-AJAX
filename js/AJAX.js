const AJMOD = (function() {
  //create the XMLHttpRequestObj
  var callIt,
    reqObj = new XMLHttpRequest();

  callIt = function(options) {
    //check if browser supports
    if (!reqObj) {
      console.log("Doesn't support");
    }

    //callback function which is invoked on readystatechange
    reqObj.onreadystatechange = options.callBack;

    //open connection to server
    reqObj.open(options.method, options.url);

    //request server
    reqObj.send();
  };

  return {
    callIt: callIt.bind(reqObj)
  };
})();

/*
  Returns a method callIt which accepts options as parameter
  Format: 

  options : {
      callBack: function to be called on readystatechanges,function ref
      url: api to hit, ("") 
      method: http method, ("")
  }
*/
