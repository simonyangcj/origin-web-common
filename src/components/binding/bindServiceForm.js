'use strict';

angular.module('openshiftCommonUI').component('bindServiceForm', {
  controllerAs: 'ctrl',
  bindings: {
    serviceClass: '<',
    showPodPresets: '<',
    applications: '<',
    formName: '=',
    allowNoBinding: '<?',
    projectName: '<',
    bindType: '=', // One of: 'none', 'application', 'secret-only'
    appToBind: '=' // only applicable to 'application' bindType
  },
  templateUrl: 'src/components/binding/bindServiceForm.html',
  controller: function ($filter, gettextCatalog) {
    var ctrl = this;

    ctrl.uiSelectMatchPlaceholder = this.applications.length ? gettextCatalog.getString('Select an application') : gettextCatalog.getString('There are no applications in this project');

    var humanizeKind = $filter('humanizeKind');
    ctrl.groupByKind = function(object) {
      return humanizeKind(object.kind);
    };
  }
});
