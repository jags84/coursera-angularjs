(function () {
  'use strict';
  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/menuApp/templates/categories-list.html',
    bindings: {
      items: '<'
    }
  });

})();
