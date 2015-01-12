angular.module('ngMeetup.angular-data',['angular-data.DS'])
    .config(function(DSProvider) {
        // set the base url to /api
        DSProvider.defaults.baseUrl = '/api';

        // because we use a custom search request we need to override the defaultFilter function.
        // if we don't do this, angular-data will not return results if we search in the cache
        DSProvider.defaults.defaultFilter = function (collection, resourceName, params, options) {
            params = params || {start: 0, size: 100};

            var filtered = _.filter(collection, function (attrs) {
                if(params.done === true) {
                    if(attrs['done']) return false;
                }
                return params.task === undefined || attrs['task'].toLowerCase().indexOf(params.task.toLowerCase()) > -1;
            });

            console.log(params);
            console.log(filtered);

            return filtered.slice(params.start, params.start + params.size);
        };
    })
    .factory('Todo', function(DS) {
        // define Todo resource
        return DS.defineResource({
            name: 'todos'
        });
    })
    .controller('TodoCtrl', function ($scope, Todo) {

        $scope.searchRequest = {start: 0, size: 100};
        $scope.filter = {
            dontShowDone: undefined,
            task: ''
        };

        $scope.edit = function (todo) {
            $scope.editing = angular.copy(todo);
        };

        $scope.cancelEdit = function () {
            $scope.editing = undefined;
        };

        $scope.load = function () {
            Todo.findAll($scope.searchRequest).then(function(data) {
                $scope.todos = data;
            });
        };

        $scope.createTodo = function () {
            Todo.create({done: false, task: $scope.newTask.name}).then(function (response) {
                $scope.newTask = {};
            }, function (error) {
                console.log(error);
                alert('Failed to create Todo');
            });
        };

        $scope.updateTodo = function (todo) {
            Todo.save({id: todo.id, done: todo.done, task: todo.name}).then(function (response) {
                $scope.newTask = {};
                $scope.editing = undefined;
            }, function (error) {
                alert('Failed to create Todo');
            });
        };

        $scope.deleteTodo = function (todo) {
            Todo.destroy(todo.id).then(function (response) {
                $scope.newTask = {};
                $scope.load();
            }, function (error) {
                alert('Failed to create Todo');
            });
        };

        // this will check the cache for modifications and reload the list when necessary
        Todo.bindAll($scope, 'todos', $scope.searchRequest);

        $scope.$watch('filter.dontShowDone', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.searchRequest.done = newVal === true;
            }
            if($scope.searchRequest.done === false) {
                delete $scope.searchRequest.done;
            }
            $scope.load();
        });

        $scope.$watch('filter.task', function (newVal) {
            $scope.searchRequest.task = newVal;
            $scope.load();
        });
    });