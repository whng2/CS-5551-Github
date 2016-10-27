(function(){

  var Api = function($scope,Maps_Factory,OpenWeather_Factory){

     $scope.Status=false;
     document.getElmentById("weather").style.visibility="hidden";

     var directions;

     function init(){
       directions = new google.maps.DirectionsRenderer();
       map = new google.maps.Map(document.getElmentById("Map"),{
         center: {lat:100,lng:-120},
         zoom: 5
       });

       var Source = document.getElementById("Source");
       var Destination = document.getElementById("Destination");

       var auto_Source = new google.maps.places.Autocomplete(Source);
       var auto_Destination = new google.maps.places.Autocomplete(Destination);

       auto_Source.bindTo('bounds',map);
       auto_Destination.bindTo('bounds',map);
       directions.setMap(map);

     };
     init();

     $scope.getDirection= function(){

       var store_data = [];

       if($scope.Source!=null && $scope.Destination!==null){

         Maps.calculateRoute($scope.Source,$scope.Destination,directions);

         Weather.getWeather($scope.Source).success(function(data){

           $scope.Source_name=data.name;
           $scope.Source_temp=data.main.temp;
           $scope.Source_wind=data.wind.speed;
           $scope.Source_weather=data.weather[0].main;
           $scope.Source_weatherDesc=data.weather[0].description;
           $scope.Source_humidity=data.main.humidity;
           $scope.Source_icon= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";


         });

         Weather.getWeather($scope.Destination).success(function(data){

           $scope.Destination_name=data.name;
           $scope.Destination_temp=data.main.temp;
           $scope.Destination_wind=data.wind.speed;
           $scope.Destination_weather=data.weather[0].main;
           $scope.Destination_weatherDesc=data.weather[0].description;
           $scope.Destination_humidity=data.main.humidity;
           $scope.Destination_icon= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
           document.getElmentById("weather").style.visibility= "visible";
         });

       }
     };
  }
  Api.$inject = ["$scope","Maps_Factory","OpenWeather_Factory"]
  angular.module("Mash",[]).controller("Api",Api)
}());
