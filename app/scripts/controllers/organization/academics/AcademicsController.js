/*
    @Author - Ram
*/    
(function (module) {
    mifosX.controllers = _.extend(module, {
        AcademicsController: function (scope, resourceFactory, location) {
            scope.academics = [];
          
            resourceFactory.academicsResource.getAllAcademics( function (data) {
                scope.academics = data;
            });

            scope.routeTo = function (id) {
                location.path('/viewacademicyear/' + id);
            };
        }
    });
    mifosX.ng.application.controller('AcademicsController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.AcademicsController]).run(function ($log) {
        $log.info("AcademicsController initialized");
    });
}(mifosX.controllers || {}));