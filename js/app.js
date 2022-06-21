// Aqui declaramos o módulo, que é ligado
// ao HTML através da diretiva ng-app
var app = angular.module("app", ["ngRoute"]);

// Declaramos um value dentro do módulo
// Em AngularJs values são valores que podem
// ser utilizados em diversas páginas.
app.value("news", {news: []});

// Declaramos o controller para a página
// na qual o usuário acessa sua lista notícias
// Em AngularJS, os controllers são ligados ao código
// HTML através da diretiva ng-controller
// Mas no nosso caso, estamos utilizando a
// biblioteca angular-route na qual o controller
// é associado ao HTML no método config
// quando configuramos as rotas de navegação
app.controller("index", ["$scope", "$http", "news", function($scope, $http, news){
  $scope.news = news.news;
  
  // Caso o array esteja vazio, busca
  // os valores da API
  if (news.news.length == 0){
    $http.get('http://localhost:80/new-rest-api/news.php').success(function(data) {
      for (indice in data){
        news.news[indice] = data[indice];
      }
    });
  }

  $scope.mostraLista = $scope.news.length == 0;

  // Exclui uma new (notícia)
  $scope.delete = function(newless){
    $http.delete('http://localhost:80/new-rest-api/news.php', {
      params: {id: newless.id}
    }).success(function(data){
      indice = $scope.news.indexOf(newless);
      $scope.news.splice(indice, 1);
    });
  }
}]);

// Visualizar uma new (notícia)
app.controller('show', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  // Caso o array esteja vazio, busca
  // os valores da API
    $http.get('http://localhost:80/new-rest-api/news.php', {params: {new_id: $routeParams.ID}
  }).then(function(res){
    $scope.new = res.data;
  }).catch(function(response) {
    console.log("ERROR:", response);
  });

  // Exclui uma new (notícia)
  $scope.update = function(new_att){
    indice = $scope.new.indexOf(new_att);
    console.log(new_att)
    console.log(indice)
    $http.put('http://localhost:80/new-rest-api/news.php', new_att).success(function(data){
      $scope.new[indice] = data;
    });
  }
}]);

// Controller para a página na qual o usuário
// efetua a Edição de new (notícia)
app.controller("update", ["$scope", "$http", "news", '$routeParams', function($scope, $http, news, $routeParams){
  $scope.news = news.news;
  $scope.tittle = "";
  $scope.description = "";
  $scope.body = "";

  // Atualiza uma nova new (notícia)
  $scope.update = function(tittle, description, body ){
  if (tittle == "" || description == "" || body == "") return;

  $http.put('http://localhost:80/new-rest-api/news.php', {
    params: {id: $routeParams.ID},
    tittle: tittle,
    description: description,
    body: body
  }).success(function(data) {
    $scope.news[$scope.news.length] = data
    $scope.tittle = "";
    $scope.description = "";
    $scope.body = "";
    });
  }
}]);

// Controller para a página na qual o usuário
// efetua a inclusão de new (notícias)
app.controller("create", ["$scope", "$http", "news", function($scope, $http, news){
  $scope.news = news.news;
  $scope.tittle = "";
  $scope.description = "";
  $scope.body = "";

  // Insere uma nova new (notícia)
  $scope.create = function(tittle, description, body ){
  if (tittle == "" || description == "") return;

  $http.post('http://localhost:80/new-rest-api/news.php', {
    tittle: tittle,
    description: description,
    body: body
  }).success(function(data) {
    $scope.news[$scope.news.length] = data
    $scope.tittle = "";
    $scope.description = "";
    $scope.body = "";
    });
  }
}]);


// Configura as rotas de navegação
// da aplicação Web
app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/index", {
      controller: "index",
      templateUrl: "partials/index.html"
    })
    .when("/create", {
      controller:"create",
      templateUrl:"partials/create.html"
    })
    .when("/show/:ID", {
      controller:"show",
      templateUrl:"partials/show.html"
    })        
    .when("/update/:ID", {
      controller:"show",
      templateUrl:"partials/update.html"
    })    
    .otherwise({
      controller: "index",
      templateUrl: "partials/index.html"
    });
}]);