// Develop by
// Juan A. Gonzalez
// jags84@gmail.com
// https://jags84.github.io

(function (){
  'use string';
  // App
  angular.module("LunchCheck",[])
  // Controller
  .controller('LunchCheckController',LunchCheckController);
  LunchCheckController.$inject = ['$scope'];
  // Controller function
  function LunchCheckController($scope){
    // Set food value
    $scope.food = '';
    // Verify fatnes function after button click
    $scope.verifyFatnes = function (){
      // Clean message and alert
      $scope.alert = "";
      $scope.message = "";
      var food = $scope.food.split(',');
      var items = getItems(food)
      // Set message value
      setMessage(items);
    };
    // Get how many items does the lunch have
    function getItems(food_array){
      if(food_array[0]=="")
        return 0;
      return cleanArray(food_array).length;
    };
    // Clean Array
    function cleanArray(food){
      var arr = food.filter(Boolean)
      return arr;
    };
    // Display Message
    function setMessage(qty){
      switch (true) {
        case (qty == 0):
          $scope.alert = "Please enter data first"
          break;
        case (qty>0 && qty<=3):
          $scope.message = "Enjoy!"
          break;
        case (qty>3):
          $scope.message = "Too much!"
          break;
      };
    };
  };
})();
