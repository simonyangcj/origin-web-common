"use strict";

angular.module("openshiftCommonUI")

  .directive("editProject", function($window) {
    return {
      restrict: 'E',
      scope: {
        project: '=',
        submitButtonLabel: '@',
        redirectAction: '&',
        onCancel: '&',
        isDialog: '@'
      },
      templateUrl: 'src/components/edit-project/editProject.html',
      controller: function($scope,
                           $filter,
                           $location,
                           Logger,
                           NotificationsService,
                           ProjectsService,
                           annotationNameFilter,
                           displayNameFilter,
                           gettextCatalog) {
        if(!($scope.submitButtonLabel)) {
          $scope.submitButtonLabel = gettextCatalog.getString('Save');
        }

        $scope.isDialog = $scope.isDialog === 'true';

        var annotation = $filter('annotation');
        var annotationName = $filter('annotationName');

        var editableFields = function(resource) {
          return {
            description: annotation(resource, 'description'),
            displayName: annotation(resource, 'displayName')
          };
        };

        var mergeEditable = function(project, editable) {
          var toSubmit = angular.copy(project);
          toSubmit.metadata.annotations[annotationName('description')] = editable.description;
          toSubmit.metadata.annotations[annotationName('displayName')] = editable.displayName;
          return toSubmit;
        };

        var cleanEditableAnnotations = function(resource) {
          var paths = [
            annotationNameFilter('description'),
            annotationNameFilter('displayName')
          ];
          _.each(paths, function(path) {
            if(!resource.metadata.annotations[path]) {
              delete resource.metadata.annotations[path];
            }
          });
          return resource;
        };

        $scope.editableFields = editableFields($scope.project);

        $scope.update = function() {
          $scope.disableInputs = true;
          if ($scope.editProjectForm.$valid) {
            ProjectsService
              .update(
                $scope.project.metadata.name,
                cleanEditableAnnotations(mergeEditable($scope.project, $scope.editableFields)))
              .then(function(project) {
                // angular is actually wrapping the redirect action :/
                var cb = $scope.redirectAction();
                if (cb) {
                  cb(encodeURIComponent($scope.project.metadata.name));
                }

                NotificationsService.addNotification({
                  type: 'success',
                  message: gettextCatalog.getString("Project {{name}} was successfully updated.",{name: displayNameFilter(project)})
                });
              }, function(result) {
                $scope.disableInputs = false;
                $scope.editableFields = editableFields($scope.project);
                NotificationsService.addNotification({
                  type: 'error',
                  message: gettextCatalog.getString("An error occurred while updating project {{displayName}}.",{displayName: displayNameFilter($scope.project)}),
                  details: $filter('getErrorDetails')(result)
                });
                Logger.error(gettextCatalog.getString("Project {{displayName}} could not be updated.",{displayName: displayNameFilter($scope.project)}), result);
              });
          }
        };

        $scope.cancelEditProject = function() {
          var cb = $scope.onCancel();
          if (cb) {
            cb();
          } else {
            $window.history.back();
          }
        };
      },
    };
  });
