!(function() {

// SERVICES
var services = angular.module('services', []);

// SPARQL-Service
services.factory('SparqlService', function($http) {    
    var sparqlService = {
        query: function(query){
              return $http({
                method: 'GET',
                headers: { 'Accept' : 'application/sparql-results+json' },
                url: 'http://localhost:8080/sparql',
                params: {query: query}
            })}
    }
    return sparqlService;
});

}).call(this);