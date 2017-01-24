(function (){
  'use string';
  // App
  angular.module("NarrowItDownApp",[])
  // Controller
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

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

      // Verify if food is empty
      if(menu.food.length != 0){
        var promise = MenuSearchService.getMatchedMenuItems(menu.food)
        promise.then(function(response){
          menu.found = response;
          menu.error = false;
        }).
        catch(function(error){
          console.log("Error on service")
        })
      }else{
        menu.error = true;
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
          if (value.description.toLowerCase().indexOf(food) !== -1) {
            // Add Item if found
            foundItems.push(value);
          }
        })
        return foundItems;
      });
    };

  };

})();
