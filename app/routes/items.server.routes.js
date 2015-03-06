'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	items = require('../../app/controllers/item.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/items')
		.get(items.list)
		.post(users.requiresLogin, items.create);

	app.route('/items/:itemId')
		.get(items.read)
		.put(users.requiresLogin, items.hasAuthorization, items.update)
		.delete(users.requiresLogin, items.hasAuthorization, items.delete);
	app.route('/search/:searchText')
		.get(items.searchItem)
	// Finish by binding the article middleware
	app.param('itemId', items.itemByID);
};