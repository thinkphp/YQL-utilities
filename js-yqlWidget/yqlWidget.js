if (!window.YAHOO){

  document.write('<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yahoo/yahoo-min.js" ></script>' +

         '<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/get/get-min.js" ></script>');
}

//show me love to Module Pattern
yqlWidget = function() {

    var yqlPublicQueryURL = 'http://query.yahooapis.com/v1/public/yql?';

    var widgetStack = [];

    var currString, resultFormat, queryInsert, setupConfig = [];

    var pattern = /\{([\w\-\.\[\]]+)\}/gi;

    var onYQLReqSuccess = function(o){ if (setupConfig['debug'] && window.console){ console.log('GET request succeeded'); }}

    var onYQLReqFailure = function(o){ if (setupConfig['debug'] && window.console){ console.log('GET request failed'); }}

    var optional = null;

    //method: getYQLData
    //description: Use the query provided as parameter to make a request to YQL endpoint to capture data 
     var getYQLData = function(query){

         document.getElementById(queryInsert).innerHTML = 'Loading...';  

         //prepare the URL for YQL query:
          var sURL = yqlPublicQueryURL + "q=" + encodeURIComponent(query) + "&format=json&callback=yqlWidget.getYQLDataCallback&&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
        
          //make GET request to YQL with provided query
          var transactionObj = YAHOO.util.Get.script(sURL, {

                onSuccess : onYQLReqSuccess,

                onFailure : onYQLReqFailure,

                scope : this
          });

        return transactionObj;
      }

    //method: parseYQLResults
    //description: using the results set, parse the YQL results into display node
    var parseYQLResults = function(results) { 

                //get first JSON node - use loop due to first node being an unknown object
                var firstChild;

                    for (var child in results){

                             if (results.hasOwnProperty(child)) {

                                         firstChild = results[child];

                                         break;
                             }//endif
                    }//endfor


                //return data instantiation
                var html = "";


                    //loop through all YQL return elements and result replace regex
                    if(firstChild.length !== undefined) {

                           for(var i=0;i<firstChild.length;i++) { 

                              html += parseConfig(firstChild[i]); 
                           }
                        
                    } else {

                              html += parseConfig(firstChild);
                    }

                 document.getElementById(queryInsert).innerHTML = html;      

       yqlWidget.render();            

    }


    var parseYQLPath = function(results) { 

                var firstChild = results;

                var html = "";

                    if(firstChild.length !== undefined) {

                           for(var i=0;i<firstChild.length;i++) { 

                              html += parseConfig(firstChild[i]); 
                           }
                        
                    } else {

                              html += parseConfig(firstChild);
                    }

                 document.getElementById(queryInsert).innerHTML = html; 

       optional = null;

       yqlWidget.render();            

    }
     

    //method: parseConfig
    //description: loop through configuration array for provided data set node
    var parseConfig = function(node) { 

          var currString = node;

                   if(resultFormat) {

                           currString = resultFormat.replace(pattern,function(matchedSubstring,index,originalString){

                                        return eval("currString."+index); 
                           });
                   }

          return currString;
    } 
   


 /************************************************************
  * Method: Public Function Return
  * Functions: push - push into stack functions
  *             pop - pop stach
  *            init - starts yql parsing functions
  *            getYQLDataCallback - yql run callback
  ************************************************************/

    //public functions return
    return{

            //push widget on the load stack
            push: function(query,config,format,insertEl,plus) {

                 if(query == null || format == null || insertEl == null) {

                             if(window.console) {

                                    console.log('Missing query, return format or insert element');

                                    return null; 
                             } 
                 }


                 //push widget load on the stack
                 widgetStack.push(function(){yqlWidget.init(query, config, format, insertEl,plus); }); 

            },

            //widget initialization
            init: function(query,config,format,insertEl,plus) { 

                  if(plus) optional = plus;

                  if(config) setupConfig = config;

                  resultFormat = format;

                  queryInsert = insertEl; 

              return getYQLData(query); 
            },
 
            //yql data caption success callback
            getYQLDataCallback: function(json) {  

              var path;

                      if(!json.query.results) {

                          if (setupConfig['debug'] && window.console){ console.log('YQL query returned no results'); }

                          return null;

                      } else {

                          if (setupConfig['debug'] && window.console){ console.log('YQL query returned results'); }
                      }

                     if(!optional) {path = json.query.results;} else {path = eval('json.query.results'+'.'+optional);}

                     if(optional) {parseYQLPath(path);} else {parseYQLResults(path);}

            },

            //pop widget off the load stack and execute
            render: function() {

                    if(widgetStack.length > 0) {return widgetStack.pop()();}
            }

         };    
}();