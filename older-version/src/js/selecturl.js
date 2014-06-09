jQuery(function($){
    
    /* Places selected value to the previous element */
    $('.selector').change(function(){
        if($(this)[0].selectedIndex>0) {
            var urlInput = $(this).closest("tr").find("input");
            var option = $('option:selected', this);
            urlInput.val(option.data("about"));
        }
    });

});
