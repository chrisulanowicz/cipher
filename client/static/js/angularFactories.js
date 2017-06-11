cipherApp.factory('cipherFactory', function($http){
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
	};
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
	};
	factory.getUnencryptedText = function(callback, errCallback){
		$http({
			url: "/static/files/decrypted.txt",
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
	};
	factory.decryptText = function(newText, callback, errCallback){
		$http.post('/decrypt', newText).then(callback, errCallback);
	};
	factory.encryptText = function(input, callback, errCallback){
		$http.post('/encrypt', input).then(callback, errCallback);
	};
	factory.createCipher = function(keyword, callback,errCallback){
		$http.post('/cipher', keyword).then(callback, errCallback);
	}
	return factory;
})