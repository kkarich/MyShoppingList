'use strict';

angular.module('items').controller('ItemsController', ['$scope','$mdDialog','$rootScope', '$stateParams', '$location','$http','$q', 'Authentication', 'Items',
	function($scope,$mdDialog,$rootScope, $stateParams, $location,$http,$q, Authentication, Items) {
		$scope.authentication = Authentication;
		$scope.search ={searchText:''};
		
		 var items = Items.query(function() {
		    $scope.items = items
		   
		  }); 


		$scope.show_import_favorites = function(ev) {
		    $mdDialog.show({
		      controller: 'FavoritesController',
		      templateUrl: '/modules/items/views/import-favorites.client.view.html',
		      targetEvent: ev,
		    })
  		};

		$rootScope.$on('ListUpdated', function () {
		  	 var items = Items.query(function() {
	
				    $scope.items = items
				  }); 
		});


		$scope.convertRecipe= function(recipe) {
			var items = recipe.split('\n');
			
			for(var i in items){
		        $scope.create(items[i]);
		    };

		};


		$scope.update = function(item) {
			
			item.$update(function() {
				$location.path('items/' + item._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
				
		$scope.create = function(name) {
			var item = new Items({
				name: name,
				inCart:false,
				bought:false,
				favorite:false
			});
			item.$save(function(response) {
				
				$scope.items.push(response);

				$scope.search.searchText = ''
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(item) {
			if (item) {
				item.$remove();

				for (var i in $scope.items) {
					if ($scope.items[i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}
		};

		$scope.update = function(item) {
			
			item.$update(function() {
				$location.path('items/' + item._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.add_to_favorites = function(item) {
			
			
				item.favorite = !item.favorite;
			
			$scope.update(item)
			
			
		};

		$scope.add_to_cart = function(item) {
			
			
				item.inCart = !item.inCart;
			
			$scope.update(item)
			
			
		};

		$scope.clear_basket = function() {
			
			for( var i in $scope.items){
				var item = $scope.items[i]
				
				if (item.inCart ){
					
					item.bought = true
					$scope.update(item)
					
				}
			}
			
		};

		$scope.find = function() {
			$scope.items = Items.query();
		};

		$scope.findOne = function(item) {
			item.editing = false;
			item = Items.get({
				itemId: item._id
			});
		};

		$scope.query = function(searchText) {
			 var deferred = $q.defer();
			
			 $http.get('/search/'+searchText )
			  .success(function(data, status, headers, config) {
				   deferred.resolve( data.ArrayOfString.string );
				  }).
				  error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			return deferred.promise
		};
	}
]);