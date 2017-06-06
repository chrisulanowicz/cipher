cipherApp.controller('cipherController', ['cipherFactory', function(cipherFactory){
	console.log("cipher controller loaded up");

	let self = this;
	this.newText = {};
	cipherFactory.getEncryptedText(function(response){
		self.encryptedText = response.data;
	}, function(error){
		console.log(error);
	});
	cipherFactory.getPlainText(function(response){
		self.plainText = response.data;
	}, function(error){
		console.log(error);
	});
	this.decrypt = function(encrypted, plain){
		let newText = {"encrypted":encrypted, "plain":plain};
		cipherFactory.decryptText(newText, function(response){
			console.log("response is", response);
			delete self.encryptedText;
			self.decryptedText = response.data.decryptedText;
		}, function(error){
			console.log(error);
		})
	}
}]);