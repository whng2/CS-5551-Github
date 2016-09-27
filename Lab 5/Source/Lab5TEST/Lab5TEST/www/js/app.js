//var apple= angular.module('apple', ['ionic'])


var starter= angular.module('starter', ['ionic', 'ngCordova', 'ngTwitter'])





starter.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.Gallery', {
      url: '/Gallery',
      views: {
        'Gallery-tab': {
          templateUrl: 'templates/Gallery.html',
          controller: 'ExampleController'
        }
      }
    })
    .state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab': {
          templateUrl: 'templates/contact.html'
        }
      }
    });


   $urlRouterProvider.otherwise('/sign-in');

})

starter.controller('SignInCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.user= {};
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
  $scope.signIn = function(user) {
    LoginService.loginUser($scope.user.username,$scope.user.password).success(function(user){
      $state.go('tabs.home');
    }).error(function(user){
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please check your Credentials!'
      });
    });
 
  }
  
})

starter.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})

starter.controller('ExampleController',function($scope)
 {
$scope.images = [];
$scope.loadImages = function() {
for(var i = 0; i < 100; i++) {
$scope.images.push({id : i, src : "http://placehold.it/50x50"});
    }
  }
})


starter.service('LoginService',function($q){
  return {
    loginUser: function(name,pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if(name ==  'ionic' && pw == 'ionic') {
        deferred.resolve('welcome' + name + '!');
      } else {
        deferred.reject('Please enter correct username/password');
      }
      promise.success=function(fn){
        promise.then(fn);
        return promise;
      }
      promise.error=function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});









//angular.module('starter', ['ionic', 'ngCordova', 'ngTwitter'])

starter.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

starter.controller('AppCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth) {
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'hUe4xTSbIIsJ1KtXwXJcGT9xU';
  var clientSecret = 'b5cALdsiISjtAh5VL3aKRviqfdRgrkSEUmK3WdSqBoD5V9fB1T';
  var myToken = '';

  $scope.tweet = {};

  // Automatically start the OAuth dialog if no token was found
  $ionicPlatform.ready(function() {
    myToken = JSON.parse(window.localStorage.getItem(twitterKey));
    if (myToken === '' || myToken === null) {
      $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
        myToken = succ;
        window.localStorage.setItem(twitterKey, JSON.stringify(succ));
        $twitterApi.configure(clientId, clientSecret, succ);
        $scope.showHomeTimeline();
      }, function(error) {
        console.log(error);
      });
    } else {
      $twitterApi.configure(clientId, clientSecret, myToken);
      $scope.showHomeTimeline();
    }
  });

  // Load your home timeline
  $scope.showHomeTimeline = function() {
    $twitterApi.getHomeTimeline().then(function(data) {
      $scope.home_timeline = data;
    });
  };

  // Post a tweet
  $scope.submitTweet = function() {
    $twitterApi.postStatusUpdate($scope.tweet.message).then(function(result) {
      $scope.showHomeTimeline();
    });
  }

  // Pull-to-refresh
  $scope.doRefresh = function() {
    $scope.showHomeTimeline();
    $scope.$broadcast('scroll.refreshComplete');
  };

  // Display the correct date from Twitter response
  $scope.correctTimestring = function(string) {
    return new Date(Date.parse(string));
  };

});