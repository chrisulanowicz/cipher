const cipherApp = angular.module('cipherApp', ['ngRoute']);

cipherApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/partials/home.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.when('/sample-decrypt', {
			templateUrl: 'views/partials/sampleDecrypt.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.when('/sample-encrypt', {
			templateUrl: 'views/partials/sampleEncrypt.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.when('/cipher', {
			templateUrl: 'views/partials/cipher.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.when('/text-decrypt', {
			templateUrl: 'views/partials/textDecrypt.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.when('/text-encrypt', {
			templateUrl: 'views/partials/textEncrypt.html',
			controller: 'cipherController',
			controllerAs: "CC"
		})
		.otherwise({
			redirectTo: '/'
		});
})