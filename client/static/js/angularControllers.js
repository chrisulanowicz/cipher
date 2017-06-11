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
	this.decryptWithKeyword = function(){
		console.log("controller line 30", self.newDecryption);
		cipherFactory.decryptWithKeyword(self.newDecryption, function(response){
			console.log("response is", response);
			self.decryptedText2 = response.data.decryptedText;
			self.cipher = response.data.cipher;
		}, function(error){
			console.log(error);
		})
	};
	this.encrypt = function(){
		cipherFactory.encryptText(self.newEncryption, function(response){
			delete self.unencryptedText;
			self.encryptedText2 = response.data.encryptedText;
			self.cipher = response.data.cipher;
		}, function(error){
			console.log(error);
		})
	};
	this.createCipher = function(){
		cipherFactory.createCipher(self.input, function(response){
			self.newCipher = response.data.newCipher;
		}, function(error){
			console.log(error);
		})
	};
}]);