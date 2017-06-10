cipherApp.controller('cipherController', ['cipherFactory', function(cipherFactory){

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
	cipherFactory.getUnencryptedText(function(response){
		self.unencryptedText = response.data;
	}, function(error){
		console.log(error);
	});
	this.decrypt = function(encrypted, plain){
		let newText = {"encrypted":encrypted, "plain":plain};
		cipherFactory.decryptText(newText, function(response){
			delete self.encryptedText;
			self.decryptedText = response.data.decryptedText;
		}, function(error){
			console.log(error);
		})
	};
	this.encrypt = function(unencrypted){
		let input = {"unencrypted":unencrypted, "keyword":self.keyword};
		cipherFactory.encryptText(input, function(response){
			delete self.unencryptedText;
			self.encryptedText2 = response.data.encryptedText;
			self.cipher = response.data.cipher;
		}, function(error){
			console.log(error);
		})
	};
}]);