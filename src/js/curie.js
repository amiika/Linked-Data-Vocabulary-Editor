jQuery(function($){
    
    /* Creates CURIE from URI
       Elements must have @content="?uri" and @class=".curie"
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
        
        console.log("CURIE from "+uri)
        
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                console.log(curie);
                console.log("curie "+curie.toString());
                prefixifyElement(element,curie.toString());
                if(element.editable) {
                    console.log("IS EDITABLE!?");
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
    
     $(".curie-link").each(function(){
        var element = $(this);
        var uri = element.attr("href");
        
        console.log("CURIE-link from "+uri)
        
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                console.log("curie "+curie);
                prefixifyElement(element,curie);
                element.attr("href","#"+uri.split('#')[1]);
             } catch(e) {
               prefixifyElement(element,uri);
               console.log(e);
               console.log(element);
             }
        }
    });
    
    $(".curie-id").each(function(){
        var element = $(this);
        var uri = element.attr("about");
        
        if(uri) {
            try {
                var curie = element.createCurie(uri);
                element.attr("id",uri.split('#')[1]);
             } catch(e) {
               console.log(e);
               console.log(element);
             }
        }
    });
    
    
    /*
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
    */
});