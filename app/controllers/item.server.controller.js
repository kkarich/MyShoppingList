'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Item = mongoose.model('Item'),
	request = require('request'),
	parser = require('xml2json'),
	_ = require('lodash');

/**
 * Create an item
 */
exports.create = function(req, res) {
	var item = new Item(req.body);
	item.user = req.user;

	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};

/**
 * Show the current item
 */
exports.read = function(req, res) {
	console.log(req.item)
	res.json(req.item);
};

/**
 * Update an item
 */
exports.update = function(req, res) {
	var item = req.item;

	item = _.extend(item, req.body);
	console.log(item)
	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};

/**
 * Delete an item
 */
exports.delete = function(req, res) {
	var item = req.item;

	item.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};

/**
 * List of items
 */
exports.list = function(req, res) {
	Item.find({user:req.user}).sort('-created').populate('user', 'displayName').exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(items);
		}
	});
};

exports.searchItem = function(req, res) {
  request('http://www.supermarketapi.com/api.asmx/GetGroceries?APIKEY=beb8c965ba&SearchText='+req.params.searchText, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var xml = body;
	var json = parser.toJson(xml, {object: true}); //returns a string containing the JSON structure by default
	res.json(json); 
  }
})
};

/**
 * Item middleware
 */
exports.itemByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Item is invalid'
		});
	}

	Item.findById(id).populate('user', 'displayName').exec(function(err, item) {
		if (err) return next(err);
		if (!item) {
			return res.status(404).send({
  				message: 'Item not found'
  			});
		}

		req.item = item;
		next();
	});
};


/**
 * Item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.item.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};