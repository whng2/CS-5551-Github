(function(){

  var Maps = function($http){

     var Map = {};

     var directionService = new google.maps.DirectionsService();


    Maps.calculateRoute = function(Source, Destination, mapObject){
     var options = {
       source: Source,
       destination: Destination,
       travelMode: 'DRIVING'
     };
     directionService.route(options, function(result, Status){

       if(Status==="OK")
       mapObject.setDirections(result);
     });
  }
  return Map;
};
 Maps.$inject=["$http"]
 angular.module("Mash",[]).factory("Maps", Maps)
}());
