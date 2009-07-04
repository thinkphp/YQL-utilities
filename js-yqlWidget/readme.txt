This widget contains files associated with the construction of a JavaScript widget for displaying data obtained from YQL. 
This widget uses the following external utilities:
<a href="http://developer.yahoo.com/yui/get/">YUI GET</a> - Obtains data from public YQL URI (avoids same origin policy issue)

There are two files associated with the widget:

yqlWidget.js
This is the JavaScript widget that captures the YQL data and parses the formatting defined by the user. This file needs to be included where the YQL JS widget is to be displayed.        


yqlWidget.html
he HTML file displays sample methods for initializing and rendering a YQL widget. See the following example:

1.  <script type="text/javascript" src="yql_js_widget.js"></script>
2.  <div id="widgetContainer"></div>
3.  <script type="text/javascript">
4.  var config = {'debug' : true};
5.  var format = '<br style="clear:both" />{item.description}';
6.  var yqlQuery = 'select * from weather.forecast where location = 90210';
7.  var insertEl = 'widgetContainer';
8.  yqlWidget.push(yqlQuery, config, format, insertEl);
9.  yqlWidget.render();
10. </script>

Going through the above example, here is the definition for how to format the requests:

Line 1: include the widget JavaScript file

Line 2: Create the container the you would like to drop the widget into (must have an id)

Line 4: Optional Define the config object. This object has the following available key / value pairs: 

        debug (true / false) - If set to true, status messages will be displayed via console.log during widget rendering

Line 5: 

        Define the format string. This string will be what is inserted into the container defined on line 2 and will be added for each result returned by YQL and may contain HTML / CSS / JavaScript. Any text that is added between curly brackets (e.g. {test}) will be re-rendered as the associated data returned by YQL. For instance, if you go to the YQL Console and run the weather query, {item.description} will relate to the results at query->results->channel->item->description.

Line 6:

        Define the YQL query to pass to the public YQL URI.

Line 7:

        Define the id of the container you wish to insert the widget into

Line 8:

        Push the widget on the stack. If you have multiple widgets to be rendered, you would push each widget on the load stack using push before rendering (as seen on line 9). The push function accepts the following parameters:

        <ul>
            <li>YQL Query (REQUIRED) - The query defined on line 6</li>   
            <li>Config (OPTIONAL) - The config object defined on line 4</li>
            <li>Format (REQUIRED) - The content to add for each result into the container defined</li>
            <li>Insert Element (REQUIRED) � The id of the container to insert the widget into</li>
        </ul>

Line 9: 

       Render all widgets pushed onto the load stack