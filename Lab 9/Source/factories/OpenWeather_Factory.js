(function(){

var Weather = function($http){

   var temp = {};

   temp.getWeather = function(city){

      var apiKey = "36d4ca342366fabdd77499c360ea5bcb";
      var Uri = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
      return $http.get(uri);
   };
   return temp;
}
Weather.$inject = ["$http"]
angular.module("Mash",[]).factory("Weather", Weather)

}());
