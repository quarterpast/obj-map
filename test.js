var sinon = require('sinon');
var expect = require('sinon-expect').enhance(require('expect.js'), sinon, 'was');

var objMap = require('./');

describe('objMap', function() {
	it('should call iterator with each key', function() {
		var iter = sinon.stub();
		objMap({a:1, b:2, c:3}, iter);
		expect(iter).was.calledThrice();
		expect(iter).was.calledWith('a');
		expect(iter).was.calledWith('b');
		expect(iter).was.calledWith('c');
	});
	it('should call iterator with each key and value', function() {
		var iter = sinon.spy();
		objMap({a:1, b:2, c:3}, iter);
		expect(iter).was.calledThrice();
		expect(iter).was.calledWith('a', 1);
		expect(iter).was.calledWith('b', 2);
		expect(iter).was.calledWith('c', 3);
	});
	it('should call iterator with each key, value, and the object they rode in on', function() {
		var iter = sinon.spy();
		var o = {a:1, b:2, c:3};
		objMap(o, iter);
		expect(iter).was.calledThrice();
		expect(iter).was.calledWith('a', 1, o);
		expect(iter).was.calledWith('b', 2, o);
		expect(iter).was.calledWith('c', 3, o);
	});
	it('should return new object with values transformed by iterator', function() {
		expect(objMap({a:1, b:2, c:3}, function(k, v) {
			return v * 2;
		})).to.eql({a:2, b:4, c:6});
	});
});

describe('objMap.async', function() {
	it('should call iterator with each key', function(done) {
		var iter = sinon.stub().yields();
		objMap.async({a:1, b:2, c:3}, iter, function(e) {
			expect(iter).was.calledThrice();
			expect(iter).was.calledWith('a');
			expect(iter).was.calledWith('b');
			expect(iter).was.calledWith('c');
			done(e);
		});
	});
	it('should call iterator with each key and value', function(done) {
		var iter = sinon.stub().yields();
		objMap.async({a:1, b:2, c:3}, iter, function(e) {
			expect(iter).was.calledThrice();
			expect(iter).was.calledWith('a', 1);
			expect(iter).was.calledWith('b', 2);
			expect(iter).was.calledWith('c', 3);
			done(e);
		});
	});
	it('should call back new object with values transformed by iterator', function(done) {
		objMap.async({a:1, b:2, c:3}, function(k, v, cb) {
			cb(null, v * 2);
		}, function(e, ys) {
			expect(ys).to.eql({a:2, b:4, c:6});
			done(e);
		});
	});
	it('should exit on first error', function(done) {
		var o = {};
		var iter = sinon.stub().yields(o);
		objMap.async({a:1, b:2, c:3}, iter, function(e, ys) {
			expect(e).to.be(o);
			expect(iter).was.calledOnce();
			done();
		});
	});
});
