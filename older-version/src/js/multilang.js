jQuery(function($){

    /* Supported languages in SELECT-elements */
    var langJSON = {"fi":"fi","en":"en","sv":"sv"};
    
    /* Append lang badge after property value */
    $(".append-input-lang").each(function() {
        var lang = $(this).attr("lang");
        if(lang!==undefined)
            $(this).append(" <span class='badge badge-info'>"+lang+"</span>");
    });
    
    /* Appends SELECT element for the language to the parents next element */
    $(".append-lang-edit").each(function(i){
        // Create unique id for the multilang elements
        var element = $(this);
        var id = element.attr("id");
        element.attr("id",id+"_"+1);
        // Get the lang from the element
        var lang = element.attr("lang");
        // Generate editable badge for the language
        
        var langBlock = $("<select class='form-control property-input-lang'><option value=''></option></select>");
        
        $(this).parent().next().append(langBlock);
    
    });
    
    
    // Initializes all SELECT-elements using .lang class with previous languages
    $.each(langJSON,function(key, value) {
            $('.property-input-lang').each(function(){
                // Append lang options to language selection elements
                $(this).append('<option value=' + key + '>' + value + '</option>');
            });
    });
    
    // Set value from corresponding property input
    $('.property-input-lang').each(function(){
        var index = $(this).index();
        $(this).val($(this).closest(".property-container").find(".property-input").eq(index).attr("lang"));
    });
    
    // Changes language to the closest property container 
    $('.property-input-lang').change(function(){
        var index = $(this).index();
        console.log($(this).val());
        $(this).closest(".property-container").find(".property-input").eq(index).attr("lang",$(this).val());
    });

});