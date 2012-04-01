jQuery-yql
-----------

###Description:
A simple jQuery Plugin that queries Yahoo's YQL, fetch the results through JSONP, and calls 
success callback with the results.

###Syntax:
new Request.YQL(yql, vars, callback)

###Explanation:
Request.YQL automatically handles variables replacement with the query, so if
you use a query that look like this:

"select * from table where some_field=#{foo} and another_field=#{moo}"
with the object:

{
  'foo': 'asd',
  'moo': '1234567'
}

the query above will becomes this:
'select * from table where some_field="asd"  and another_field=1234567'

"@" variables
Works in the same way of the #{variable}
"select * from table where some_field=@var1 and another_field=@var2"
