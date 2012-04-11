YQLQuery
--------

###Description:
A simple script that queries Yahoo's YQL, fetch the results through JSONP, and calls 
success callback with the results.

###Syntax:

  var yql = 'select * from {table} where username={username}';

  new YQLQuery(yql,callback).fetch()

### Example:

    var yql = "select * from flickr.photos.search where has_geo='true' and text='san francisco' and api_key='e407090ddb7d7c7c36e0a0474289ec74'"

    new YQLQuery(yql, function(data){

                      var photos = data.query.results.photo,
                          n = photos.length;

                      var out = '<ul>';

                      for(var i=0; i<n; i++) {

                          out += template(tpl,photos[i])
                      }  

                      out += '</ul>';
                      $('flickr').innerHTML = out;  
    }).fetch();


