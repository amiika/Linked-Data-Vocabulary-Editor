jQuery(function($){
    

            $('.removeGroup').click(function() {
                console.log("hip");
                var x = $(this);
                var fg = x.closest(".control-group");
                console.log(fg);
                fg.remove();
        
               /* console.log(index);
                // Find closest property container
                var pc = x.closest(".property-container");
                var inputs = pc.find(".form-group");
               
                if(inputs.length>1) {
                    inputs.each(function(){
                            console.log("Removing "+index);
                                if($(this).children().length>1){
                      var child = $(this).children().eq(index).remove();
                                }
                    });
                } */
            });
            
            $('.addGroup').click(function(){
                var x = $(this);
                // Find closest property container
                var pc = x.closest(".property-container");
                
                pc.find(".form-group").each(function(){
                        
                        var clone = $(this).children().last().clone(true);
                        
                        var formControls = clone.find(".form-control");
                        formControls.each(function(){
                            var ctrl = $(this);

                            var newID = ctrl.attr("id")+"-";
                           // ctrl.data("add",add.replace(ctrl.attr("id"),newID));
                          //  ctrl.data("construct",construct.replace(ctrl.attr("id"),newID));
                           ctrl.attr("id",newID);
                            
                        
                        });
                        
                        $(this).append(clone);
                    });
                
            });
            
            // Removes empty fields from closest property container
             $('.addremove').click(function(){
                var x = $(this);
                // Find closest property container
                var pc = x.closest(".property-container");
                var inputs = pc.find(".property-input");
                
                // If input length is > 1 check for empty inputs
                if(inputs.length>1) {
                    inputs.each(function(){
                        if($(this).val()==="") {
                            var index = $(this).index();
                            console.log("Removing "+index);
                            pc.find(".form-group").each(function(){
                                if($(this).children().length>1){
                                    var child = $(this).find(".form-control").eq(index).remove();
                                }
                            });
                            
                        }
                    });
                }
             
               var input = inputs.last();
                var value;
                
                // Check value from input or editable element
                if(input.is('input') || input.is('textarea'))
                    value = input.val();
                else 
                    value = input.text();
                    
                if(value && value!=="") {
                    // Add new input after the last one if it is not empty
                    pc.find(".form-group").each(function(){
                        var clone = $(this).find(".form-control").last().clone(true);
                        clone.val("");
                        clone.attr("id",clone.attr("id")+"-");
                        $(this).append(clone);
                    });
                }
            });
        
});