var app = angular.module('app', []);

var crossOrigin = {
	'X-Requested-With': "XMLHttpRequest",
	'Accept':'application/json, text/javascript',
	'Content-Type': 'application/json; charset=utf-8',
	'Access-Control-Max-Age' : '1728000',
	'Access-Control-Allow-Origin': '*'
};
var nodeUrlPort = 'http://localhost:8080';
app.controller('authorCtrl', function($scope, $http){
	$scope.buttonName = 'Ekle';
	$scope.authors = [];
	$scope.getAuthors = function(){
		$http.get(nodeUrlPort+'/author', crossOrigin).success(function(data) {
			$scope.authors =  data || {};
		});
	};
	
	$scope.addAuthor = function () {
		if($scope.buttonName == 'Düzenle') {
			if($scope.id != '' && $scope.name != '' && $scope.surname != ''){
				$http.post(nodeUrlPort+'/author/edit/'+$scope.id, {name:$scope.name, surname:$scope.surname}).success(function(data) {
					$scope.getAuthors();
					$scope.cancelAuthor();
				});
			}
		}
		else if($scope.buttonName == 'Ekle') {
			if($scope.name != '' && $scope.surname != ''){
				$http.post(nodeUrlPort+'/author/create', {name:$scope.name, surname:$scope.surname}).success(function(data) {
					$scope.getAuthors();
					$scope.cancelAuthor();
				});
			}
		}

	};
	
	$scope.editAuthor = function (id) {

		$http.get(nodeUrlPort+'/author/edit/'+id).success(function(data) {
			if(data){
				$scope.buttonName = 'Düzenle';
				$scope.id = data.id;
				$scope.name = data.name;
				$scope.surname = data.surname;
			}
		});
	};

	$scope.deleteAuthor = function (id) {
		$http.get(nodeUrlPort+'/author/delete/'+id).success(function(data) {
			$scope.getAuthors();
		});
	};
	
	$scope.cancelAuthor = function () {
		$scope.buttonName = 'Ekle';
		$scope.id = '';
		$scope.name = '';
		$scope.surname = '';
	}

});

app.controller('bookCtrl', function($scope, $http){
	$scope.buttonName = 'Ekle';
	$scope.authors = [];
	$scope.getAuthors = function(){
		$http.get(nodeUrlPort+'/author', crossOrigin).success(function(data) {
			$scope.authors =  data || {};
		});
	};


	$scope.books = [];
	$scope.getBooks = function(){
		$http.get(nodeUrlPort+'/book', crossOrigin).success(function(data) {
			$scope.books =  data || {};
		});
	};

	$scope.addBook = function () {
		if($scope.buttonName == 'Düzenle') {
			if($scope.id != '' && $scope.name != '' && $scope.author != ''){
				$http.post(nodeUrlPort+'/book/edit/'+$scope.id, {name:$scope.name, author:$scope.author}).success(function(data) {
					$scope.getBooks();
					$scope.cancelBook();
				});
			}
		}
		else if($scope.buttonName == 'Ekle') {
			if($scope.name != '' && $scope.author != ''){
				$http.post(nodeUrlPort+'/book/create', {name:$scope.name, author:$scope.author}).success(function(data) {
					$scope.getBooks();
					$scope.cancelBook();
				});
			}
		}

	};

	$scope.editBook = function (id) {

		$http.get(nodeUrlPort+'/book/edit/'+id).success(function(data) {
			if(data){
				$scope.buttonName = 'Düzenle';
				$scope.id = data.id;
				$scope.name = data.name;
				$scope.author = data.author;
			}
		});
	};

	$scope.deleteBook = function (id) {
		$http.get(nodeUrlPort+'/book/delete/'+id).success(function(data) {
			$scope.getBooks();
		});
	};

	$scope.cancelBook = function () {
		$scope.buttonName = 'Ekle';
		$scope.id = '';
		$scope.name = '';
		$scope.author = '';
	}

});