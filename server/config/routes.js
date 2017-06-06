const cipher = require('./../controllers/cipher.js');

module.exports = function(app){
	
	app.post('/decrypt', function(req, res){
		cipher.decrypt(req, res);
	});

}