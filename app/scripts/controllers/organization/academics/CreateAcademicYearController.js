/*
 Author - Ram
*/
(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateAcademicYearController: function (scope, resourceFactory, location, dateFilter) {

            scope.date = {};
            scope.date.first = new Date();
            scope.date.second = new Date();
            scope.date.third = new Date();
            scope.firstError = false;
            scope.secondError = false;
           
            scope.minDat = new Date();

            scope.submit = function () {
                var testDate = new Date();
                testDate.setDate(testDate.getDate() - 1);

                if(scope.date.second < testDate){
                    scope.secondError = true;
                }
                else {
                    scope.secondError = false;
                    var reqFirstDate = dateFilter(scope.date.first, scope.df);
                    var reqSecondDate = dateFilter(scope.date.second, scope.df);
                    var reqThirdDate = undefined;
                    var newacademicyear = new Object();
                    newacademicyear.locale = scope.optlang.code;
                    newacademicyear.dateFormat = scope.df;
                    newacademicyear.name = this.formData.name;
                    newacademicyear.shortName = this.formData.shortName;
                    newacademicyear.startDate = reqFirstDate;
                    newacademicyear.endDate = reqSecondDate;                    
                    newacademicyear.description = this.formData.description;
                 
                    resourceFactory.academicsResource.save(newacademicyear, function (data) {
                        location.path('/academics');
                    });
                }
            };
        }
    });
    mifosX.ng.application.controller('CreateAcademicYearController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.CreateAcademicYearController]).run(function ($log) {
        $log.info("CreateAcademicYearController initialized");
    });
}(mifosX.controllers || {}));

