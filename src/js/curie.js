jQuery(function($){
    
    /* Creates CURIE from URI
       Elements must have @content="?uri" and @class=".curie"
       Depends on rdfquerycore.js
    */
    
    var namespace = $("#namespace").text();
    var prefix = $("#prefix").attr("content");
    
    if(prefix && namespace) {
        console.log(namespace);
        console.log(prefix);
        $("html").xmlns(prefix,namespace);
    }
    
    function prefixifyElement(elem, value) {
      if (elem.is('input')) {
        elem.val(value);
      } else {
        elem.text(value);
      } 
    }
    
    $(".curie").each(function(){
        var element = $(this);
        var uri;
        
        if (element.is('input')) {
            uri = element.val();
        } else {
            uri = element.text();
        }
        
        if(!uri) uri = element.attr("href");
          
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                prefixifyElement(element,curie.toString());
                
                if(element.editable) {
                    console.log("ELEMENT IS X-EDITABLE");
                    element.editable('setValue',curie);
                }
                
                element.attr("data-value",curie);
             } catch(e) {
               prefixifyElement(element,uri);
               console.log(e);
               console.log(element);
             }
        }
    });
    
    /* creates #-links */
    $(".curie-link").each(function(){
        var element = $(this);
        var uri = element.attr("href");
        
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                prefixifyElement(element,curie);
                element.attr("href","#"+uri.split('#')[1]);
             } catch(e) {
               element.attr("href","#"+uri.split('#')[1]);
               prefixifyElement(element,uri.split('#')[1]);
               console.log(e);
               console.log(element);
             }
        }
    });
    
    /* creates ids from uris */
    $(".curie-id").each(function(){
        var element = $(this);
        var uri = element.attr("about");
        
        if(uri) {
            try {
                element.attr("id",uri.split('#')[1]);
             } catch(e) {
               console.log(e);
               console.log(element);
             }
        }
    });

});