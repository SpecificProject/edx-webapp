/**
 * @author Ram
 */

(function (module) {
    mifosX.controllers = _.extend(module, {
        EditAcademicYearController: function (scope, routeParams, resourceFactory, location, dateFilter) {
            scope.formData = {};
            scope.date = {};
            scope.restrictDate = new Date();
            //Get academic year by ID
            resourceFactory.academicsValueResource.getAcademicvalues({academicYearId: routeParams.id}, function (data) {
                scope.academicYearData = data;
                scope.formData = {
                    name: data.name,
                    shortName : data.shortName,
                    startDate : data.startDate,
                    endDate : data.endDate,
                    description: data.description,
                };

                var startDate = dateFilter(data.startDate, scope.df);
                scope.date.startDate = new Date(startDate);

                var endDate = dateFilter(data.endDate, scope.df);
                scope.date.endDate = new Date(endDate);
            });

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                if (!scope.holidayStatusActive) {
                    this.formData.startDate = dateFilter(scope.date.startDate, scope.df);
                    this.formData.endDate = dateFilter(scope.date.endDate, scope.df);
                }
                 
                resourceFactory.academicsValueResource.update({academicYearId: routeParams.id}, this.formData, function (data) {
                    location.path('/viewacademicyear/' + routeParams.id);
                });
            };
        }
    });
    mifosX.ng.application.controller('EditAcademicYearController', ['$scope', '$routeParams', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.EditAcademicYearController]).run(function ($log) {
        $log.info("EditAcademicYearController initialized");
    });
}(mifosX.controllers || {}));
