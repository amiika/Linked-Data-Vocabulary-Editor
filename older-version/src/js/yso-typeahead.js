 /* This is demo of linking concepts to the upper ontology of finland (finto.fi) */
 $(function() {
          
 var fintoCall = function(qry,process) {
    $.post('http://api.finto.fi/rest/v1/search?'+jQuery.param({vocab:"koko",query:qry+"*",lang:"fi"}), 
      function(data){
          process(data.results);
  });
}
        
/* Timeout alustus */
var timeout;

/* Typeahead-komponentin alustus */
$('#query').typeahead({
    hint: true,
    minLength: 2
}, {
    name: 'Test',
    displayKey: 'prefLabel',
    source: function (query, process) {

        if (timeout) clearTimeout(timeout);
        
        // Haetaan sekunnin kuluttua kirjoittamisen lopettamisesta
        timeout = setTimeout(function () {
            fintoCall(query, process);
        }, 500);

    },
    templates: {
        empty: [
            '<div class="empty-message">Tarkenna hakua</div>'].join('\n'),
        suggestion: Handlebars.compile('<div>{{prefLabel}}</div>')
    }
}).on('typeahead:selected', function (obj, concept) {
    console.log(concept);
    
    //$("#source").val(concept.uri);
    $("#source").html("<div id='sourceURI' about='"+concept.uri+"'><span property='skos:prefLabel' id='sourceLabel' content='"+concept.prefLabel+"'/></div>");
   // $("#sourceURI").attr("about",concept.uri);
   // $("#sourceLabel").attr("content",concept.prefLabel);
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    $('.tt-query').css('background-color','#fff');
    
});