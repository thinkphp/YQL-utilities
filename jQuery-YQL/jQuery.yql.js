(function($){

  $.extend({

     _prepareParams: function(query, params) {

         $.each(params,function(key){
                 
                var name = "#{"+ key +"}",

                value = $.trim(this)

                if(!value.match(/^[0-9]+$/)) {
                    value = '"'+ value + '"'
                }

                while(query.search(name) > -1) {
                      query = query.replace(name,value) 
                } 

                var name = "@"+ key,

                value = $.trim(this)

                if(!value.match(/^[0-9]+$/)) {
                    value = '"'+ value + '"'
                }

                while(query.search(name) > -1) {
                      query = query.replace(name,value) 
                } 

                var name = "@{"+ key +"}",

                value = $.trim(this)

                if(!value.match(/^[0-9]+$/)) {
                    value = '"'+ value + '"'
                }

                while(query.search(name) > -1) {
                      query = query.replace(name,value) 
                } 
         }
         )

        return query;
     },

     yql: function(query) {

          var $self = this,
              successCallback = null,
              errorCallback = null;

          if(typeof arguments[1] == 'object') {
         
             query = $self._prepareParams(query, arguments[1])
             successCallback = arguments[2]
             errorCallback = arguments[3]                
 
          } else if(typeof arguments[1] == 'function') {

              successCallback = arguments[1];
              errorCallback = arguments[2];
          }

          var doAsync = successCallback != null, 

          params = {
              url: "http://query.yahooapis.com/v1/public/yql",
              dataType: "jsonp",
              success: successCallback,
              async: doAsync,
              data: {
                  q: query,
                  format: 'json',
                  env: 'store://datatables.org/alltableswithkeys',
                  callback: "?" 
              }   
          };

          if(errorCallback) {
              params.error = errorCallback 
          }   

          $.ajax(params)

        return this;  
     }

   }

  )
})(jQuery)