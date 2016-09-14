'use strict';

// Declare app level module which depends on views, and components
//angular.module('myApp', [])
var apple = angular.module('apple', []);





    apple.controller('View1Ctrl', function ($scope, $http)
     {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
                document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);


                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        for (var i = 0; i < data.response.venues.length; i++) {
                            $scope.venueList[i] = {
                                "name": data.response.venues[i].name,
                                "id": data.response.venues[i].id,
                                "location": data.response.venues[i].location
                            };
                        }
                    }
                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        };


        $scope.getReviews = function (venueSelected)
        {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
                    "?sort=recent" +
                    "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
                    "&limit=5");


                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.tips != null &&
                        result.response.tips.items != null) {
                        $scope.mostRecentReview = result.response.tips.items[0];
                        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=599b47fa62fa13afb57a452c1f8b1c853e2d881a" +
                            "&outputMode=json&text=" + $scope.mostRecentReview.text);
                        callback.success(function (data) {
                            if (data != null && data.docSentiment != null) {
                                $scope.ReviewWithSentiment = {
                                    "reviewText": $scope.mostRecentReview.text,
                                    "sentiment": data.docSentiment.type,
                                    "score": data.docSentiment.score
                                };
                                document.getElementById('div_ReviewList').style.display = 'block';
                            }
                        })
                    }
                });
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }
     });








    //var map=angular.module('GoogleDirection', []);
    apple.controller('googlemapoutput', function ($scope) {

    var map;
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer
    ({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();



    $scope.initialize = function ()
    {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions =
        {
            zoom: 3,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };


    $scope.calcRoute = function ()
    {
        var end = document.getElementById('endlocation').value;
        var start = document.getElementById('startlocation').value;
        var request =
        {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route
        (
            request, function (response, status)
            {
                if (status == google.maps.DirectionsStatus.OK)
                {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }

            }
        );
    };
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
});


