function YQLQuery(query,callback,format,diagnostics) {
 
         this.query = query;
         this.format = format || 'json'; 
         this.diagnostics = diagnostics || false;
         this.callback = callback || function(){};      
}

YQLQuery.prototype.fetch = function() {

         if(!this.query || !this.callback) {
             console.log("Fetch error: missing parameters!");
             return; 
         }

         var scriptEl = document.createElement('script'),
             endpoint = 'http://query.yahooapis.com/v1/public/yql?q=',
             env = '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
             encodedURL = encodeURIComponent(this.query),
             format = this.format, 
             id = "yql" + (+new Date()), 
             that = this,
             src = endpoint + encodedURL + '&format='+ format + '&callback=YQLQuery.' + id + '&diagnostics=' + this.diagnostics + env;

         YQLQuery[id]= function(data) {
             if(window.console) {console.log(data);}
             that.callback(data);
             delete YQLQuery[id];
             document.body.removeChild(scriptEl);
         }  
         
         scriptEl.src = src;

         document.body.appendChild(scriptEl);  
}
