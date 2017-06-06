cipherApp.factory('cipherFactory', function($http){
	console.log("loaded factory");
	let factory = {};
	factory.getEncryptedText = function(callback, errCallback){
		$http({
			url: "/static/files/encrypted.txt",
			dataType: 'json',
			method: 'GET',
			data: '',
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(success){
			callback(success);
		}, function(error){
			errCallback(error);
		});
	}
	factory.getPlainText = function(callback, errCallback){
		$http({
			url: "/static/files/plain.txt",
			dataType: 'json',
			method: 'GET',
			data: '',
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(success){
			callback(success);
		}, function(error){
			errCallback(error);
		});
	}
	factory.decryptText = function(newText, callback, errCallback){
		$http.post('/decrypt', newText).then(callback, errCallback);
	}
	return factory;
})