/**
PlainLiteral input
@class PlainLiteral
@extends abstractinput
@final
@example
<a href="#" id="PlainLiteral" data-type="PlainLiteral" data-pk="1">awesome</a>
<script>
$(function(){
    $('#PlainLiteral').editable({
        title: 'Enter text',
        value: {
            lang: 'fi',
            text: 'Test'
        }
    });
});
</script>
**/
(function ($) {

    var PlainLiteral = function (options) {
        this.init('PlainLiteral', options, PlainLiteral.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(PlainLiteral, $.fn.editabletypes.select);
    //$.fn.editableutils.inherit(PlainLiteral, $.fn.editabletypes.abstractinput);
    
    $.extend(PlainLiteral.prototype, {
        value2input: function(value,element) {
            
            console.log("value2input");
            
            if(!value) {
               return;
            }
            this.$input.filter('select').val(value.lang);
            this.$input.filter('input').val(value.text);
        },

        input2value: function() {
            return {
                lang: this.$input.filter('select').val(),
                text: this.$input.filter('input').val()
            }
        },

        value2html: function(value, element) {
             $(element).attr("content",value.text);
             if(value.lang) {
                $(element).attr("lang",value.lang);
                $(element).html(value.text+" ("+value.lang+")");
             }
            else
                $(element).html(value.text);
        },
        
        html2value: function(value,element) {
            var lang = element.attr("lang");
            if(lang) {
                $(element).attr("content",value);
                $(element).html(value+" ("+lang+")");
            }
            return {lang:element.attr("lang"), text:value};
        }
/*
        str2value: function(str) {
            console.log("STR?");
            console.log(str);
            if( !str || !(typeof(str) === 'string'))
               return str;

            var splitPos = str.indexOf(':');
            if(splitPos < 0)
               return str;
            var type = str.substr(0,splitPos).trim();
            var text = str.substr(splitPos+1).trim();

            return {lang:type, text:text}
        }*/
    });

    PlainLiteral.defaults = $.extend({}, $.fn.editabletypes.select.defaults, {
            mode: 'inline', 
            toggle: 'click',
            success: function() {
                return true;
            },
            source: [
              {value: "", text: ''},
              {value: "fi", text: 'fi'},
              {value: "en", text: 'en'}
           ],
            tpl: '<input class="form-control" type="text" name="PlainLiteral_value">'+
                '<select class="form-control"></select>',
            inputclass: ''
    });

    $.fn.editabletypes.PlainLiteral = PlainLiteral;

}(window.jQuery));