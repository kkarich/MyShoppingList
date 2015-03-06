'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	category: {
		type: String,
		default: '',
		trim: true
	},
	isle: {
		type: String,
		default: '',
		trim: true
	},
	favorite: {
		type: Boolean,
		default: '',
		trim: true
	},
	inCart: {
		type: Boolean,
		default: '',
		trim: true
	},
	bought: {
		type: Boolean,
		default: '',
		trim: true
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Item', ItemSchema);