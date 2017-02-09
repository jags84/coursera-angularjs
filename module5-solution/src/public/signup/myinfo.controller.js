(function () {
  "use strict";

  angular.module('public')
  .controller('MyinfoController', MyinfoController);

  MyinfoController.$inject = ['UserdataService','MenuService'];
  function MyinfoController(UserdataService,MenuService) {
    var myinfo = this;
    myinfo.user = UserdataService.getUserData();

    // Verify if data is null
    if(myinfo.user===null){
      myinfo.reg = true;
    }else{
      myinfo.reg = false;
      var promise = MenuService.getFavMenu(myinfo.user.dish_number);
      promise.then(function(response){
        // Success
        myinfo.dish = response;
      }).
      catch(function(error){

      })
    }

  }


})();
