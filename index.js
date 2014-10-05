var asyncEarlyError = require('async-early-error');

function objMap(obj, fn) {
	var out = {};
	for(var p in obj) if(obj.hasOwnProperty(p)) {
		out[p] = fn(p, obj[p], obj);
	}
	return out;
}

function asyncObjMap(obj, fn, cb) {
	var out = {}, l = Object.keys(obj).length, erred = false;
	for(var p in obj) {
		fn(p, obj[p], asyncEarlyError(function(e) {
			if(!erred) {
				erred = true;
				cb(e);
			}
		}, function(y) {
			out[p] = y;
			if(Object.keys(out).length === l) {
				cb(null, out);
			}
		}));
	}
}

module.exports = objMap;
module.exports.async = asyncObjMap;
