describe('PasswordController', function() {
  beforeEach(module('ionicApp'));

  var scope;

  beforeEach(inject(function($rootScope, $controller){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    scope= $rootScope.$new();
    $controller('SignInCtrl',{$scope: scope});
    var username='Sowmya';
    it('username and password shouldnot be empty',function(){
      expect(scope.username).toEqual('Sowmya');
      expect(scope.password).toBeDefined();
    })
  }));

  describe('$scope.grade', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('SignInCtrl', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    it('sets the strength to "weak" if the password length <3 chars', function() {
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
  });
});