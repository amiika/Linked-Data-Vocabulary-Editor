(function($){

$(document).ready(function() {

    // Gets current locale from the localStorage
    var locale = localStorage.getItem("callimachus.locale");

    // If locale is not undefined and empty or default -> localize
    if(locale && locale!=="default") {
        $("[data-localize]").localize("locale", { pathPrefix:"../src/locales", language: locale});
    }
    
    // Set new locale from clicked elements data-locale attribute
    $(".setLocale").click(function(){
        var selected = $(this).data("locale");
        if(selected) {
            if(selected=="default") {
                location.reload();
            } else {
            // If locale is something else -> localize
                $("[data-localize]").localize("locale", {pathPrefix:"../src/locales", language: selected});
            }
        }
    });

});

})(jQuery);