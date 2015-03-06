'use strict';

//Items service used for communicating with the items REST endpoints
angular.module('items').factory('Items', ['$resource',
	function($resource) {
		return $resource('items/:itemId', {
			itemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);