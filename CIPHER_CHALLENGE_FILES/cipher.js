// run file using Node (in terminal type "node cipher.js" once inside file directory)
'use strict';
const fs = require("fs"); // need file system to read and write text files

// bring in required text files
let encryptedText = fs.readFileSync("encrypted.txt","utf8");
let plainText = fs.readFileSync("plain.txt", "utf8");
let encryptedHardText = fs.readFileSync("encrypted_hard.txt", "utf8");
let usersInput = fs.readFileSync("decrypted.txt", "utf8");

// function that takes in plain text and encrypted text and finds the cipher used by comparing the two
// once cipher analyzed this function was modified to return a complete cipher
// cipher based on a simple substitution using a combination keyword and atbash cipher
function findEncryption(plain, encrypted){ 
	// sanitize the files by removing all spaces and linebreaks which speeds up processing
	// and lessens room for error in comparing texts
	plain = plain.toLowerCase().replace(/\s+|\r?\n|\n/g, '');
	encrypted = encrypted.toLowerCase().replace(/\s+|\r?\n|\n/g, '');
	let cipher = {};
	let numLetters = 0; // using to track how many letters we've decoded
	const encryptLength = encrypted.length;
	const plainLength = plain.length;
	let encryptIndex = 0;
	// loop through the plain text and compare characters to encrypted text
	for(let i=0;i<plainLength;i++){
		let plainLetter = plain[i];
		let encryptLetter = encrypted[encryptIndex];
		// uppercase char codes 65-90, lowercase char codes 97-122
		// since punctuation is the same we want to only compare actual letters
		let plainLetterCode = plainLetter.charCodeAt(0);
		let encryptLetterCode = encryptLetter.charCodeAt(0);
		if((plainLetterCode > 96 && plainLetterCode < 123) && (encryptLetterCode > 96 && encryptLetterCode < 123)){
			// check if letter is already in the cipher and has the same key/value
			if(encryptLetter in cipher){
				if(cipher[encryptLetter] != plainLetter){ // if they're different we need to reset our cipher and keep searching
					encryptIndex = 0;
					cipher = {};
					numLetters = 0;
				}
				else{
					encryptIndex++;
				}
			}
			else{ //if the letter isn't in the cipher add it in
				cipher[encryptLetter] = plainLetter;
				numLetters++;
				encryptIndex++;
			}
		}
		else if(plainLetter != encryptLetter){ // this checks if we're at a letter in one text and a punctuation mark in the other
			encryptIndex = 0;
			cipher = {};
			numLetters = 0;
		}
		else{ // else we have two matching punctuation marks
			encryptIndex++;
		}
		if(numLetters > 24){ // at this point we have enough letters to create the complete cipher
			// create 2 arrays from cipher to sort the plain letters and fill in gaps
			let keyArray = [];
			let valueArray = [];
			for(let key in cipher){
				keyArray.push(key);
				valueArray.push(cipher[key]);
			}
			// now run a standard selection sort on the array with the plain text
			// although selection sort isn't the most efficient, we'll never have more than 26 elements in the array
			// plus it'll allow us to keep track of the index since we have to make sure to make the same swaps in both arrays
			let len = valueArray.length;
			for(let j=0;j<len;j++){
				let min = valueArray[j];
				let minIndex = j;
				for(let k=j+1;k<len;k++){
					if(valueArray[k] < min){
						min = valueArray[k];
						minIndex = k;
					}
				}
				if(minIndex != j){
					let temp = valueArray[j];
					valueArray[j] = valueArray[minIndex];
					valueArray[minIndex] = temp;
					let temp2 = keyArray[j];
					keyArray[j] = keyArray[minIndex];
					keyArray[minIndex] = temp2;
				}
			}
			// now with the sorted array we can pluck out the magic keyword
			let keyword = "";
			for(let l=0;l<len;l++){
				if(keyArray[l].charCodeAt(0) != keyArray[l+1].charCodeAt(0)+1){
					keyword += keyArray[l];
				}
				else{
					break;
				}
			}
			// we'll pass this keyword to another function that creates a complete cipher and return that cipher
			return createCipher(keyword);
		}
	}
	return false; // in case something goes wrong
}

// function takes in a keyword and creates a custom cipher that combines the standard keyword cipher with an atbash cipher
// keyword gets used first in the cipher and then the rest of the alphabet is used up in reverse order
function createCipher(keyword){
	let cipher = {};
	let keywordArray = keyword.split("").reverse();
	let keyLetterCode = 122; // this will be used for the cipher text starting at z
	for(let i=97;i<123;i++){ // loop through character codes from a to z
		let keyLetter = String.fromCharCode(keyLetterCode);
		if(keywordArray.length != 0){ // first part uses up the keyword
			cipher[keywordArray.pop()] = String.fromCharCode(i);
			continue;
		}
		while(keyLetter in cipher){ // in case the cipher text letters were in the keyword we just need to keep decreasing the charcode until we get to an unused letter
			keyLetterCode--;
			keyLetter =  String.fromCharCode(keyLetterCode);
		}
		cipher[keyLetter] = String.fromCharCode(i);
	}
	return cipher; // this cipher is better used for decryption as the keys will be the cipher text.
	// to use the cipher for encryption we can just sway the keys and values
}


// function that takes in encrypted text and a cipher to decrypt it into plain text
function decryptText(encryptedText, cipher){
	let decryptedText = "";
	let len = encryptedText.length;
	for(let i = 0;i<len;i++){ // loop through the encrypted text to decrypt character by character
		let letterCode = encryptedText[i].charCodeAt(0);
		if(letterCode > 96 && letterCode < 123){ // only letters need to be decrypted
			decryptedText += cipher[encryptedText[i]];
		}
		else if(letterCode > 64 && letterCode < 91){ // this accounts for uppercase letters in the text since our cipher only contains lowercase letters
			let tempChar = String.fromCharCode(letterCode).toLowerCase();
			decryptedText += cipher[tempChar].toUpperCase();
		}
		else{ // here it's not a letter so no decryption needed
			decryptedText += encryptedText[i];
		}
	}
	return decryptedText;
}

// this function takes in a keyword and plain text and then encrypts it
// encryption uses a combination of keyword and atbash ciphers
function encryptText(userText, keyword){
	let encryptTextNew = "";
	let tempcipher = createCipher(keyword); // a cipher needs to be made from the keyword
	let cipher = {}; // the cipher returned above is for decrypting
	for(let prop in tempcipher){ // so we need to swap the keys and values so that it can be used for encryption instead
		cipher[tempcipher[prop]] = prop;
	}
	let len = userText.length;
	for(let i = 0;i<len;i++){ // loop through the plain text encrypting character by character
		let letterCode = userText[i].charCodeAt(0);
		if(letterCode > 96 && letterCode < 123){ // only letters get encrypted
			encryptTextNew += cipher[userText[i]];
		}
		else if(letterCode > 64 && letterCode < 91){ // cipher only contains lowercase letters so this will account for uppercase letters in the plain text
			let tempChar = String.fromCharCode(letterCode).toLowerCase();
			encryptTextNew += cipher[tempChar].toUpperCase();
		}
		else{
			encryptTextNew += userText[i];
		}
	}
	return encryptTextNew;
}

// here's the decryption of the easier file
let cipher = findEncryption(plainText, encryptedText); // first we let the algo's create the cipher
// then we'll decrypt it and log the text to the console
let message = decryptText(encryptedText, cipher);
console.log(message);
// this next line creates a new file with the decrypted text
fs.writeFile("decrypted.txt", decryptText(encryptedText, cipher), "utf8");

// this tests the encryption of plain text using a different keyword
let encryptedMessage = encryptText(usersInput, "algorithm");
console.log(encryptedMessage);
// we can write the text to a file also
fs.writeFile("encrypted_new.txt", encryptText(usersInput, "algorithm"), "utf8");

// For the hard version I was able to figure out the encryption myself using frequency analysis
// Thus I had to use a brute force solution here and manually create the cipher to be used in the decryption function
let cipher2 = {"a":"t","b":"a","c":"k","d":"s","e":"z","f":"y","g":"w","h":"l","i":"q","j":"j","k":"b","l":"r","m":"m","n":"v","o":"g","p":"o","q":"c","r":"d","s":"u","t":"i","u":"n","v":"p","w":"f","x":"x","y":"h","z":"e"}
// next 2 lines decrypts the hard message and simply logs it to console.
let message2 = decryptText(encryptedHardText, cipher2);
console.log(message2);
// whereas this will create a new file with the decrypted text
fs.writeFile("decrypted_hard.txt", decryptText(encryptedHardText, cipher2), "utf8");


// some issues I ran into while coming up with these algorithms
// problems with new lines, spaces not matching between encrypted and plain text when trying to find encryption
// this is why I sanitized the text before running the algo
// problems with gutenberg text which isn't in the encrypted file and didn't allow for the cipher to build up completely
// short workaround was to stop the find encryption algorithm once enough was built up in the cipher

// other issues/edge cases that need to be addressed
// if keyword includes letters next to each other in the alphabet in descending order, it can stop the cipher short of the actual keyword
// duplicate letters in keyword need to be skipped over
// needs additional refactoring to clean up code and speed up process