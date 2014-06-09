jQuery(function($){
    
    /* Creates CURIE from URI
       Elements must have @content="?uri" and @class=".curie"
    */
    
    var namespace = $("#namespace").attr("about");
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
          console.log("this is "+value);
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
        
        console.log("uri "+uri);
        
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                console.log("curie "+curie.toString());
                prefixifyElement(element,curie.toString());
             } catch(e) {
               prefixifyElement(element,uri);
               console.log(e);
               console.log(element);
             }
        }
    });
    
    $('.curie').change(function(e){
        var element = $(this);
        var input = $(this);
        var value;
        
      if (input.is('input')) {
          value = input.val();
      } else {
          value = input.text();
      } 
      
      if(value) {
      
        console.log("input val: "+value);
        console.log(element.xmlns());
        try {   
            var curie = element.curie(value);
            console.log(curie);
            input.attr("href",curie._string);
        } catch(e) {
            console.log(e);
            input.removeAttr("href");
        }
      }
    });
    
});