(function () {
  'use strict';
  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuApp/templates/category-items-list.html',
    bindings: {
      items: '<'
    }
  });

})();
