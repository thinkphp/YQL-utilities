YQLQuery
--------

###Description:
A simple script that queries Yahoo's YQL, fetch the results through JSONP, and calls 
success callback with the results.

###Syntax:

  var yql = 'select * from table where username="thinkphp"';

  new YQLQuery(yql,callback).fetch()
