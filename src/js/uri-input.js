/**
URIdentifier input
@class URIdentifier
@extends abstractinput
@final
@example
<a href="#" id="URIdentifier" data-type="URIdentifier" data-pk="1">awesome</a>
<script>
$(function(){
    $('#URIdentifier').editable({
        title: 'Enter text',
        value: {
            uri: 'http://example.org'
        }
    });
});
</script>
**/
(function ($) {

    var URIdentifier = function (options) {
        this.init('URIdentifier', options, URIdentifier.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(URIdentifier, $.fn.editabletypes.abstractinput);
    
    $.extend(URIdentifier.prototype, {
        value2input: function(value,element) {
            console.log(value);
            if(!value) {
               return;
            }
            this.$input.filter('input').val(value.uri);
        },

        input2value: function() {
            return {
                uri: this.$input.filter('input').val()
            }
        },

        value2html: function(value, element) {
               // $(element).attr("about",value.uri);
               if(value.uri && value.uri.length>0)
                    $(element).html("<span about='"+value.uri+"'>"+value.uri+"</span>");
               else {
                 $(element).html("");  
               }
        },
        
        html2value: function(value,element) {
            var about = element.find("[about]:first");
            console.log(about.attr("about"));
            return {uri:about.attr("about")};
        }

    });

    URIdentifier.defaults = $.extend({}, $.fn.editabletypes.select.defaults, {
            mode: 'inline', 
            toggle: 'click',
            success: function() {
                return true;
            },
            tpl: '<input class="form-control" type="url" name="URIdentifier_value">',
            inputclass: ''
    });

    $.fn.editabletypes.URIdentifier = URIdentifier;

}(window.jQuery));