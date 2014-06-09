 $(function(){
 
 
 $("[lang]").each(function() {
        var lang = $(this).attr("lang");
        if(lang!==undefined)
            $(this).append(" <span class='badge badge-info'>"+lang+"</span>");
    });
    
    
 $("dt").each(function(){
    var dd = $(this).next();
    if(dd.is("dd") && dd.is(':empty')) {
        $(this).remove();
        dd.remove();
    } else if(dd.is("dt") || dd.length===0) {
        $(this).remove();
    }
 });
    
    
});