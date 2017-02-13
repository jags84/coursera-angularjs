// Develop by
// Juan A. Gonzalez
// jags84@gmail.com
// https://jags84.github.io

(function () {

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
    // Index
    .state('home',{
      url: '/'
    })
    // Categories
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuApp/templates/categories.html',
      controller: 'CategoriesController as categoriesList',
      resolve:{
        items: ['MenuDataService',function(MenuDataService){
          return MenuDataService.getAllCategories();
        }]
      }
    })
    // Category Details
    .state('category',{
      url: '/category-detail/{cagegoryId}',
      templateUrl: 'src/menuApp/templates/category-items.html',
      controller: 'ItemsController as itemList',
      resolve:{
        items: ['$stateParams','MenuDataService',function($stateParams,MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.cagegoryId);
        }]
      }
    });
  }

})();
