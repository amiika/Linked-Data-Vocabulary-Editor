 $(function(){
 
 
 $("[lang]").each(function() {
        var lang = $(this).attr("lang");
        if(lang!==undefined)
            $(this).append(" <span class='badge badge-info'>"+lang+"</span>");
    });
    
    
 $("dt").each(function(){
     console.log($(this));
    
    var dd = $(this).next();
    if(dd.is("dd") && dd.is(':empty')) {
        console.log(dd);
        $(this).remove();
        dd.remove();
    }
 });
    
    
});