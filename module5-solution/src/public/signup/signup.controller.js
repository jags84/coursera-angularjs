(function () {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['UserdataService','MenuService','$filter'];
  function SignupController(UserdataService,MenuService,$filter) {
    var signup = this;
    var upCase = $filter('uppercase');
    signup.user = {};

    signup.register_user = function(){
      // Verify if short name exists
      signup.user.dish_number = upCase(signup.user.dish_number);
      var promise = MenuService.getFavMenu(signup.user.dish_number);
      promise.then(function(response){
        // Success
        UserdataService.setUserData(signup.user);
        signup.error = false;
        signup.sucess = true;
      }).
      catch(function(error){
        // Error
        signup.error = true;
      })
    };
  }


})();
