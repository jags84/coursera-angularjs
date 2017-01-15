(function (){
  'use string';
  // App
  angular.module("ShoppingList",[])
  // Controller
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // Controller ToBuyController
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var tb_list = this;
    tb_list.to_buy_list = ShoppingListCheckOffService.getToBuyList();
    tb_list.buy_item = function(index){
      ShoppingListCheckOffService.addItemToAlreadyList(index)
    };

  };

  // Controller AlreadyBoughtController
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var ab_list = this;
    ab_list.already_bought_list = ShoppingListCheckOffService.getAlreadyBoughtList();
  };

  // Shopping List service
  function ShoppingListCheckOffService() {
    var service = this;
    // Add Item to Bought List
    service.addItemToAlreadyList = function (itemIdex){
      // Lists
      tbl = this.getToBuyList()
      abl = this.getAlreadyBoughtList()
      // add item
      var item = {
        name: tbl[itemIdex].name,
        quantity: tbl[itemIdex].quantity
      };
      abl.push(item);
      // Remove Item
      tbl.splice(itemIdex, 1);
    }
    // Return ToBuyList
    service.getToBuyList = function () {
      return to_buy_list;
    };
    service.getAlreadyBoughtList = function () {
      return already_bought;
    };
    // Bought List
    var already_bought = [];
    // Shopping List
    var to_buy_list = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },
      {
        name: "Frozen Pizza",
        quantity: "10"
      },
      {
        name: "Chocolate Ice Cream",
        quantity: "4"
      },
      {
        name: "Mozarella Fingers",
        quantity: "2"
      },
      {
        name: "Chips",
        quantity: "5"
      },
      {
        name: "Sodas",
        quantity: "10"
      },
      {
        name: "Water",
        quantity: "10"
      }
    ];

  }

})();
