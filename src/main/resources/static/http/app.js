angular.module('ngMeetup.angular-data',[])
    .controller('TodoCtrl', function ($scope, $http) {

        $scope.edit = function (todo) {
            $scope.editing = angular.copy(todo);
        };

        $scope.cancelEdit = function () {
            $scope.editing = undefined;
        };

        $scope.load = function () {
            var query = _.reduce(_.keys($scope.searchRequest), function(accum_value, x) {
                var value = $scope.searchRequest[x];
                return value !== undefined ? (accum_value === '' ? '?' : accum_value + '&' ) + x + '=' + value : accum_value;
            },'');

            $http.get('/api/todos' + query).then(function (response) {
                $scope.todos = response.data;
            });
        };

        $scope.createTodo = function () {
            if (!!$scope.newTask && !!$scope.newTask.name) {
                $http.post('/api/todos', {done: false, task: $scope.newTask.name})
                    .then(function (response) {
                        $scope.newTask = {};
                        $scope.load();
                    }, function(error) {
                        alert('Failed to create Todo');
                    });
            }
        };

        $scope.updateTodo = function (todo) {
            $http.put('/api/todos/' + todo.id, todo).then(function (response) {
                $scope.newTask = {};
                $scope.editing = undefined;
                $scope.load();
            }, function (error) {
                alert('Failed to create Todo');
            });
        };

        $scope.deleteTodo = function (todo) {
            $http.delete('/api/todos/' + todo.id).then(function (response) {
                $scope.newTask = {};
                $scope.load();
            }, function (error) {
                alert('Failed to create Todo');
            });
        };

        $scope.searchRequest = {start: 0, size: 100};
        $scope.filter = {
            dontShowDone: undefined,
            task: ''
        };

        $scope.$watch('filter.dontShowDone', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.searchRequest.done = newVal === true ? true : undefined;
            }
            $scope.load();
        });

        $scope.$watch('filter.task', function (newVal) {
            $scope.searchRequest.task = newVal;
            $scope.load();
        });
    });