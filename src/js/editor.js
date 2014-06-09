$(function(){ 
     
    /* Namespace and prefix loaded from the template elements*/
    var namespace = $("#namespace").text();
    var prefix = $("#prefix").attr("content");
    
    /* hides empty divs from new vocabulary */
    $(".empty").each(function(){
        var section = $(this).closest("section");
        if(!section.attr("about") || section.attr("about").substr(0,1)=="?")
            $(this).closest("section").remove();
    });
    
    
   /* extend xeditables defaults */
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
    
    /* Adds remove button to inline edit mode */
    
    $.fn.editableform.buttons =
          '<button type="submit" class="editable-submit btn btn-primary btn-sm btn-success" title="Apply"><i class="glyphicon glyphicon-ok"></i></button>' +
          '<button type="button" class="editable-remove btn btn-primary btn-sm btn-danger" title="Remove"><i class="glyphicon glyphicon-minus"></i></button>';

    $(document).on("click", "button.editable-remove", function() { 
        
        var editable = $(this).closest(".editable-container");
        var prev = editable.prev();
        var next = editable.next();
        
        if(next.is("dd") || prev.is("dd")) {
            // Removing field
            if(next.is("dd") || prev.prev().is("dd")) {
                bootbox.confirm("Are you sure you want to remove this field?", function(result) {
                    if(result) {
                     prev.remove();
                     editable.remove();
                    }
                });
            } else {
                bootbox.alert("Last field cannot be removed!");
            }
        } else {
          // Removing class
             bootbox.confirm("Are you sure you want to remove this resource? All values will be lost.", function(result) {
               if(result) {
                var oldURI = editable.closest("section").attr("about");
                editable.closest("section").remove();
                $('li[about="'+oldURI+'"]').remove();
              }
             });
        }
    });
        
        
    /* Bootbox hax - Center new modals vertically */
   

        $('body').on('DOMNodeInserted', ".modal", function(event) {
            $(this).css({
                'top': '50%',
                'margin-top': function () {
                return -($(this).height() / 2);
                }
                });
        });

  
    /* EDITABLES */
        
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
        
    });
    

    /* Add class */
    
    $('#addClass').click(function(){

        // HTML for bootbox modal
        var elem = $('<h1>Class name</h1><input type="text" class="form-control" name="query" id="newClassName"/>');
    
        bootbox.confirm(elem, function(result) {
               
             if(result && $('#newClassName').val()) {
                    
                    var className =  $('#newClassName').val();
                    
                    var classID = calli.upperCamelCase(className);
                    
                    
                     /* New class template */
                    
                    var newClass = $('<section class="panel panel-default curie-id class" typeof="rdfs:Class" id="'+classID+'"> \
                                 <div class="panel-body"> \
                                    <h3><span class="editable-identifier" property="dcterms:identifier" content="'+classID+'">'+classID+'</span></h3>\
                                    <dl> \
                                        <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                        <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" content="'+className+'" property="rdfs:label">'+className+'</dd> \
                                        <dt>Comment <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                        <dd class="editable editable-comment editable-click editable-empty editable-label" data-type="PlainLiteral" property="rdfs:comment"></dd> \
                                        <dt>Subclass of</dt> \
                                        <dd class="editable editable-subClassOf editable-click editable-empty editable-label" data-type="URIdentifier" rel="rdfs:subClassOf"></dd> \
                                    </dl> \
                                    <div> \
                                </section>');
                    
                    var classList = $('#ClassList');
                    classList.prepend(newClass);
                    
                    
                    newClass.closest("section").attr("about",location.pathname+"#"+classID);
                    $("#ClassWell").append("<li about='"+location.pathname+"#"+classID+"'><a href='#"+classID+"'>"+prefix+":"+classID+"</a></li>");
                     
                    /* Class editable - Editing new class is bit different */
                    
                    newClass.find(".editable-identifier").editable({
                    title: 'Enter label',
                        success: function(response, newValue) {
                             newValue=calli.upperCamelCase(newValue);
                             $(this).editable('setValue', newValue);
                             var oldURI = $(this).closest("section").attr("about");
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
                              return {newValue:newValue};
                             
                        },
                    display: function(value) {
                        $(this).attr("content",value);
                        $(this).text(prefix+":"+value);
                        }
                            
                    });
                    
                    newClass.find('.editable-label').editable({
                     title: 'Enter label'
                    });
                    
                    /* Other editables */
                    newClass.editable({
                        selector:'dd'
                    });  
            }            
        });
    });
    
    
    /* Add datatype property */
    $('#addDProp').click(function(){
        
        var elem = $('<h1>Property name</h1><input type="text" class="form-control" name="query" id="newDPropName"/>');
    
        bootbox.confirm(elem, function(result) {
               
             if(result && $('#newDPropName').val()) {
                    
                    var dPropName =  $('#newDPropName').val();
                    
                    var dPropID = calli.lowerCamelCase(dPropName);
                      
                    var newDProp = $('<section class="panel panel-default curie-id class" typeof="owl:DatatypeProperty" id="'+dPropID+'"> \
                             <div class="panel-body"> \
                               <h3><span class="editable-identifier" property="dcterms:identifier" content="'+dPropID+'">'+dPropID+'</span></h3>\
                                <dl> \
                                    <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" content="'+dPropName+'" property="rdfs:label">'+dPropName+'</dd> \
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
                    
                newDProp.closest("section").attr("about",location.pathname+"#"+dPropID);
                $("#DPropWell").append("<li about='"+location.pathname+"#"+dPropID+"'><a href='#"+dPropID+"'>"+prefix+":"+dPropID+"</a></li>");
                  
                /* Idenfitied is used to create uri and append to list*/
                newDProp.find(".editable-identifier").editable({
                    success: function(response, newValue) {
                         newValue=calli.lowerCamelCase(newValue);
                         $(this).editable('setValue', newValue);
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
                          return {newValue:newValue};
                    },
                display: function(value) {
                    $(this).attr("content",value);
                    $(this).text(prefix+":"+value);
                    }
                        
                });
                
                newDProp.find('.editable-label').editable({
                     title: 'Enter label'
                });
                    
                /* Other prop editables */
                newDProp.editable({
                    selector:'dd'
                }); 
             }
        }); 
    });
    
    
    /* Add Object property */
    $('#addOProp').click(function(e){
        e.preventDefault();
        
        var elem = $('<h1>Object Property Name</h1><input type="text" class="form-control" name="query" id="newOPropName"/>');
    
    
        bootbox.confirm(elem, function(result) {
               
             if(result && $('#newOPropName').val()) {
      
                              
                var oPropName =  $('#newOPropName').val();
                    
                var oPropID = calli.lowerCamelCase(oPropName);
                
                    var newOProp = $('<section class="panel panel-default curie-id class" typeof="owl:ObjectProperty" id="'+oPropID+'"> \
                             <div class="panel-body"> \
                                <h3><span class="editable-identifier" property="dcterms:identifier" content="'+oPropID+'">'+oPropID+'</span></h3>\
                                <dl> \
                                    <dt>Label <button type="button" class="addObject btn btn-sm btn-link"><span class="glyphicon glyphicon-plus"></span></button></dt> \
                                    <dd class="editable editable-label editable-click editable-empty editable-label" data-type="PlainLiteral" content="'+oPropName+'" property="rdfs:label">'+oPropName+'</dd> \
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
              
                
                newOProp.closest("section").attr("about",location.pathname+"#"+oPropID);
                $("#OPropWell").append("<li about='"+location.pathname+"#"+oPropID+"'><a href='#"+oPropID+"'>"+prefix+":"+oPropID+"</a></li>");
                  
                /* Idenfitied is used to create uri and append to list*/
                newOProp.find(".editable-identifier").editable({
                title: 'Enter label',
                    success: function(response, newValue) {
                     newValue=calli.lowerCamelCase(newValue);  
                     $(this).editable('setValue', newValue);
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
                         return {newValue:newValue};
                    },
                display: function(value) {
                    $(this).attr("content",value);
                    $(this).text(prefix+":"+value);
                    }
                        
                });
                
                newOProp.find('.editable-label').editable({
                     title: 'Enter label'
                });
                    
                /* Other prop editables */
                newOProp.editable({
                    selector:'dd'
                }); 
              
             }
            
        });
    
        
    
    });
    
    
        
});