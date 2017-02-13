// Develop by
// Juan A. Gonzalez
// jags84@gmail.com
// https://jags84.github.io

(function (){
  'use string';
  // App
  angular.module("NarrowItDownApp",[])
  // Controller
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  // Directive
  function foundItems(){
    var ddo = {
      templateUrl:'itemList.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }
  // Controller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.food = ''
    menu.findFood = function(){
      // Set error to false
      menu.error = false;
      // Verify if food is empty
      if(menu.food.length != 0){
        var promise = MenuSearchService.getMatchedMenuItems(menu.food)
        promise.then(function(response){
          menu.found = response;
          if(menu.found.length == 0){
            menu.food = ''
            menu.error = true;
          }
        }).
        catch(function(error){
          console.log("Error on service")
        })
      }else{
        menu.error = true;
        menu.found = '';
      }
      menu.removeItem = function (itemIndex){
        menu.found.splice(itemIndex, 1);
      }
    }
  };
  // Service
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;
    // getMatchedMenuItems
    service.getMatchedMenuItems = function (food){
      return $http({
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(results){
        var foundItems = [];
        angular.forEach(results.data.menu_items,function(value,key){
          if (value.description.toLowerCase().indexOf(food.toLowerCase()) !== -1) {
            // Add Item if found
            foundItems.push(value);
          }
        })
        return foundItems;
      });
    };

  };

})();
