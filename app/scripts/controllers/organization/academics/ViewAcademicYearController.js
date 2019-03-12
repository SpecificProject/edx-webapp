/**
 * @author : Ram
 */
(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewAcademicYearController: function (scope, routeParams, resourceFactory, $uibModal, location, route) {

            //Get academic year by ID
            resourceFactory.academicsValueResource.getAcademicvalues({academicYearId: routeParams.id}, function (data) {
                scope.academicYearData = data;
                if (data.status.value === "Pending for activation") {
                    scope.academicYearStatusPending = true;
                } else if (data.status.value === "Active") {
                    scope.academicYearStatusActive = true;
                } else if (data.status.value === "Deleted") {
                    scope.academicYearStatusDeleted = true;
                } else if (data.status.value === "Close"){
                    scope.academicYearStatusClosed = true;
                }

            });

            scope.activateAcademicYear = function () {
                $uibModal.open({
                    templateUrl: 'activateAcademicYear.html',
                    controller: activateAcademicYearCtrl
                });
            };

            var activateAcademicYearCtrl = function ($scope, $uibModalInstance) {
                $scope.activate = function () {
                    resourceFactory.academicsValueResource.save({academicYearId: routeParams.id, command: 'Activate'}, {}, function (data) {
                        $uibModalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };


            scope.closeAcademicYear = function () {
                $uibModal.open({
                    templateUrl: 'closeAcademicYear.html',
                    controller: closeAcademicYearCtrl
                });
            };

            var closeAcademicYearCtrl = function ($scope, $uibModalInstance) {
                $scope.close = function () {
                    resourceFactory.academicsValueResource.save({academicYearId: routeParams.id, command: 'Close'}, {}, function (data) {
                        $uibModalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            scope.deleteAcademicYear = function () {
                $uibModal.open({
                    templateUrl: 'deleteAcademicYear.html',
                    controller: deleteAcademicYearCtrl
                });
            };

            var deleteAcademicYearCtrl = function ($scope, $uibModalInstance) {
                $scope.delete = function () {
                    resourceFactory.academicsValueResource.delete({academicYearId: routeParams.id}, {}, function (data) {
                        $uibModalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

        }
    });
    mifosX.ng.application.controller('ViewAcademicYearController', ['$scope', '$routeParams', 'ResourceFactory', '$uibModal', '$location', '$route', mifosX.controllers.ViewAcademicYearController]).run(function ($log) {
        $log.info("ViewAcademicYearController initialized");
    });
}(mifosX.controllers || {}));

