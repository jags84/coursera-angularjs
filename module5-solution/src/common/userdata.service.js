(function () {
"use strict";

angular.module('common')
.service('UserdataService', UserdataService);

  function UserdataService() {
    var service = this;
    var user_data = {};

    service.setUserData = function(reg){
      user_data = reg;
    };

    service.getUserData = function(){
      if(user_data.first_name == null){
        return null;
      }else{
        return user_data;
      }
    };
  }

})();
