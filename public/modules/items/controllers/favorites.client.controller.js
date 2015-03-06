'use strict';

angular.module('items').controller('FavoritesController', ['$scope','$rootScope','$filter', '$stateParams', '$location','$http','$q','$mdDialog', 'Authentication', 'Items',
	function($scope,$rootScope,$filter, $stateParams, $location,$http,$q,$mdDialog, Authentication, Items) {
		$scope.authentication = Authentication;
		
		 var items = Items.query(function() {
		  
		    $scope.items = $filter('filter')(items, {favorite:true})
		   
		  }); 

		  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };


	    $scope.add_to_list = function() {
			
			for( var i in $scope.items){
				var item = $scope.items[i]
				
				if (item.importing ){
					
					item.bought = false
					item.inCart = false
					$scope.update(item)
					
				}
			}
			
			 $mdDialog.cancel();
			
		};

		$scope.update_favorites = function() {
			
			for( var i in $scope.items){
				var item = $scope.items[i]

					$scope.update(item)
				
			}
			$mdDialog.cancel();
		};


		$scope.update = function(item) {
			
			item.$update(function() {
				$location.path('items/' + item._id);
				$rootScope.$broadcast('ListUpdated');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
				
		$scope.create = function(name) {
			console.log(name)
			var item = new Items({
				name: name,
				inCart:false,
				bought:false,
				favorite:false
			});
			item.$save(function(response) {
				$location.path('items/' + response._id);
				$scope.find();
				$scope.searchText = ''
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
				$rootScope.$broadcast('ListUpdated');
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.find = function() {
			var items = Items.query(function() {
		  
		    $scope.items = $filter('filter')(items, {favorite:true})
		   
		  }); 
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