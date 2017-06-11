const cipher = require('./../controllers/cipher.js');

module.exports = function(app){
	
	app.post('/decrypt', function(req, res){
		cipher.decrypt(req, res);
	});
	app.post('/decrypt/keyword', function(req, res){
		cipher.decryptWithKeyword(req, res);
	});
	app.post('/encrypt', function(req, res){
		cipher.encrypt(req, res);
	});
	app.post('/cipher', function(req, res){
		cipher.makeCipher(req, res);
	})
}