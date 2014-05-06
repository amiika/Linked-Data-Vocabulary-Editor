$(function(){ 
     
    /* Namespace and prefix loaded from the template elements*/
    var namespace = $("#namespace").text();
    var prefix = $("#prefix").attr("content");
    
    /* hide empty divs from new vocabulary */
    $(".empty").each(function(){
        var section = $(this).closest("section");
        if(!section.attr("about") || section.attr("about").substr(0,1)=="?")
            $(this).closest("section").remove();
    });
    
   /* xeditables defaults */
    var defaults = {
            emptytext: '',
            mode: 'inline', 
            toggle: 'click',
            onblur: 'cancel',
            inputclass: 'input-small',
            success: function() {
                return true;
            }    
         };
         
        $.extend($.fn.editable.defaults, defaults);
        
        
    /* Property identifier editable */
    $('.editable-property-identifier').editable({
         title: 'Enter identifier',
         success: function(response, newValue) {
             
             newValue=calli.lowerCamelCase(newValue);
             $(this).editable('setValue', newValue);
            
             var oldURI = $(this).closest("section").attr("about");
             $(this).closest("section").attr("about",location.pathname+"#"+newValue);
             $('li[about="'+oldURI+'"]').attr("about",location.pathname+"#"+newValue);

            var hrefs = $('a[href="#'+oldURI.split('#')[1]+'"]');
             hrefs.attr("href","#"+newValue);
             hrefs.text(prefix+":"+newValue);

             return {newValue:newValue};
         },
                    display: function(value) {
                        $(this).attr("content",value);
                        $(this).text(prefix+":"+value);
                    }
        });
        
    /* Class identifier editable */
        
    $('.editable-class-identifier').editable({
         title: 'Enter identifier',
         success: function(response, newValue) {
             
             newValue=calli.upperCamelCase(newValue);
             $(this).editable('setValue', newValue);
            
             var oldURI = $(this).closest("section").attr("about");
             $(this).closest("section").attr("about",location.pathname+"#"+newValue);
             $('li[about="'+oldURI+'"]').attr("about",location.pathname+"#"+newValue);

            var hrefs = $('a[href="#'+oldURI.split('#')[1]+'"]');
             hrefs.attr("href","#"+newValue);
             hrefs.text(prefix+":"+newValue);

             return {newValue:newValue};
         },
                    display: function(value) {
                        $(this).attr("content",value);
                        $(this).text(prefix+":"+value);
                    }
        });
        
        $('.editable-label').editable({
         title: 'Enter label'
        });
        
        $('.editable-comment').editable({
         title: 'Enter comment'
        });
        
        $('.editable-domain').editable({
         title: 'Enter domain'
        });
        
        $('.editable-range').editable({
         title: 'Enter range'
        });
        
        $('.editable-subClassOf').editable({
         title: 'Enter super'
        });
    
    
    /* Remove classes and properties */
    
    $('#vocabulary').on("click",".remove",function(){ 
       //var name = $(this).prev().text();
       var elem = $(this);
       bootbox.confirm("Are you sure you want to remove this class?", function(result) {
           if(result) {
            var oldURI = elem.closest("section").attr("about");
            elem.closest("section").remove();
            $('li[about="'+oldURI+'"]').remove();
           }
       });
    });
    
    /* Adds new object as dd-element */
    
    $('#vocabulary').on("click",".addObject",function(){ 
        var parent = $(this).parent();
        var next = parent.next();
        var newObject = next.clone();
        newObject.text("");
        newObject.removeAttr("lang");
        
        newObject.editable();
        next.before(newObject);
        
        /* Remove button for new object */
        var rm = $('<span class="removeObject btn btn-sm btn-link"><span class="glyphicon glyphicon-minus"></span></span>');
        newObject.after(rm);

    });
    
    /* Remove object/dd button */
    
    $('#vocabulary').on("click",".removeObject",function() {
    
             if($(this).next().is("dd") || $(this).prev().prev().prev().is("dd")) {
                 $(this).prev().remove();
                 $(this).remove();
             }
    });
    
    /* Add remove buttons on init */
    
     $("dd").each(function(){
        //console.log($(this));
        var rm = $('<span class="removeObject btn btn-sm btn-link"><span class="glyphicon glyphicon-minus"></span></span>');
        var dd = $(this);
        /*
        rm.click(function(){
            
         if(dd.prev().is("dd") || $(this).next().is("dd")) {
             dd.remove();
             rm.remove();
         }
        });
        */
        dd.after(rm);
        
    });
    

    /* Add class */
    
    $('#addClass').click(function(){
                
        /* New class template */
                
        var newClass = $('<section class="panel panel-default curie-id class" typeof="rdfs:Class"> \
                             <div class="panel-body"> \
                                <div class="btn-group pull-right"> \
                                    <button type="button" class="remove btn btn-sm btn-default">Remove <span class="glyphicon glyphicon-minus"></span></button> \
                                </div><br/> \
                                <h3><span class="editable-identifier" property="dcterms:identifier"></span></h3>\
                                <dl> \
                                    <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:label"></dd> \
                                    <dt>Comment <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-comment editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:comment"></dd> \
                                    <dt>Subclass of</dt> \
                                    <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:subClassOf"></dd> \
                                </dl> \
                                <div> \
                            </section>');
                
        var classList = $('#ClassList');
                classList.prepend(newClass);
          
        /* Class editable - Editing new class is bit different */
        
        newClass.find(".editable-identifier").editable({
        title: 'Enter label',
            success: function(response, newValue) {
                 newValue=calli.upperCamelCase(newValue);
                 var oldURI = $(this).closest("section").attr("about");
                 console.log($(this).closest("section").attr("about"));
                 if(oldURI) {
                     $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                     $("#ClassWell").find('li[about="'+oldURI+'"]').attr("about",location.pathname+"#"+newValue);
                     var hrefs = $("#ClassWell").find('a[href="#'+oldURI.split('#')[1]+'"]');
                     hrefs.attr("href","#"+newValue);
                     hrefs.text(prefix+":"+newValue);
                 } else {
                    $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                    $("#ClassWell").append("<li about='"+location.pathname+"#"+newValue+"'><a href='#"+newValue+"'>"+prefix+":"+newValue+"</a></li>");
                 }
            },
        display: function(value) {
            $(this).attr("content",value);
            $(this).text(prefix+":"+value);
            }
                
        });
        
        /* Other editables */
        newClass.editable({
            selector:'dd'
        }); 
        
    });
    
    /* Add datatype property */
    
    $('#addDProp').click(function(){
                      
        var newDProp = $('<section class="panel panel-default curie-id class" typeof="owl:DatatypeProperty"> \
                             <div class="panel-body"> \
                                <div class="btn-group pull-right"> \
                                    <button type="button" class="remove btn btn-sm btn-default">Remove <span class="glyphicon glyphicon-minus"></span></button> \
                                </div><br/> \
                                <h3><span class="editable-identifier" property="dcterms:identifier"></span></h3>\
                                <dl> \
                                    <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:label"></dd> \
                                    <dt>Comment <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-comment editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:comment"></dd> \
                                    <dt>Domain</dt> \
                                    <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:domain"></dd> \
                                    <dt>Range</dt> \
                                    <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:Range"></dd> \
                                </dl> \
                                <div> \
                            </section>');
                
        var dPropList = $('#DPropList');
            dPropList.prepend(newDProp);
          
        /* Idenfitied is used to create uri and append to list*/
        newDProp.find(".editable-identifier").editable({
        title: 'Enter label',
            success: function(response, newValue) {
                 newValue=calli.lowerCamelCase(newValue);
                 var oldURI = $(this).closest("section").attr("about");
                 console.log($(this).closest("section").attr("about"));
                 if(oldURI) {
                     $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                     $("#DPropWell").find('li[about="'+oldURI+'"]').attr("about",location.pathname+"#"+newValue);
                     var hrefs = $("#DPropWell").find('a[href="#'+oldURI.split('#')[1]+'"]');
                     hrefs.attr("href","#"+newValue);
                     hrefs.text(prefix+":"+newValue);
                 } else {
                    $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                    $("#DPropWell").append("<li about='"+location.pathname+"#"+newValue+"'><a href='#"+newValue+"'>"+prefix+":"+newValue+"</a></li>");
                 }
            },
        display: function(value) {
            $(this).attr("content",value);
            $(this).text(prefix+":"+value);
            }
                
        });
        
        /* Other prop editables */
        newDProp.editable({
            selector:'dd'
        }); 
        
    });
    
    /* Add Object property */
    
    $('#addOProp').click(function(){
                
                
        var newOProp = $('<section class="panel panel-default curie-id class" typeof="owl:ObjectProperty"> \
                             <div class="panel-body"> \
                                <div class="btn-group pull-right"> \
                                    <button type="button" class="remove btn btn-sm btn-default">Remove <span class="glyphicon glyphicon-minus"></span></button> \
                                </div><br/> \
                                <h3><span class="editable-identifier" property="dcterms:identifier"></span></h3>\
                                <dl> \
                                    <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:label"></dd> \
                                    <dt>Comment <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-comment editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:comment"></dd> \
                                    <dt>Domain</dt> \
                                    <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:domain"></dd> \
                                    <dt>Range</dt> \
                                    <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:Range"></dd> \
                                </dl> \
                                <div> \
                            </section>');
                
        var oPropList = $('#OPropList');
            oPropList.prepend(newOProp);
          
        /* Idenfitied is used to create uri and append to list*/
        newOProp.find(".editable-identifier").editable({
        title: 'Enter label',
            success: function(response, newValue) {
             newValue=calli.lowerCamelCase(newValue);  
             var oldURI = $(this).closest("section").attr("about");
                 console.log($(this).closest("section").attr("about"));
                 if(oldURI) {
                     $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                     $("#OPropWell").find('li[about="'+oldURI+'"]').attr("about",location.pathname+"#"+newValue);
                     var hrefs = $("#OPropWell").find('a[href="#'+oldURI.split('#')[1]+'"]');
                     hrefs.attr("href","#"+newValue);
                     hrefs.text(prefix+":"+newValue);
                 } else {
                    $(this).closest("section").attr("about",location.pathname+"#"+newValue);
                    $("#OPropWell").append("<li about='"+location.pathname+"#"+newValue+"'><a href='#"+newValue+"'>"+prefix+":"+newValue+"</a></li>");
                 }
                
                
            },
        display: function(value) {
            $(this).attr("content",value);
            $(this).text(prefix+":"+value);
            }
                
        });
        
        /* Other prop editables */
        newOProp.editable({
            selector:'dd'
        }); 
        
    });
        


     
     });