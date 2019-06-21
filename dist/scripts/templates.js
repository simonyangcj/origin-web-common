angular.module('openshiftCommonUI').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/binding/bindApplicationForm.html',
    "<div class=\"bind-form\">\n" +
    "  <form>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        <h3><span translate>Create a binding for application</span> <strong>{{ctrl.applicationName}}</strong></h3>\n" +
    "      </label>\n" +
    "      <span class=\"help-block\" translate>\n" +
    "        Bindings create a secret containing the necessary information for an application to use a service.\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "\n" +
    "  <label ng-if=\"!ctrl.allowNoBinding\" translate>\n" +
    "    Select a service:\n" +
    "  </label>\n" +
    "  <form name=\"ctrl.formName\">\n" +
    "    <fieldset>\n" +
    "      <div class=\"radio\">\n" +
    "        <div ng-if=\"ctrl.allowNoBinding\" class=\"bind-service-selection\">\n" +
    "          <label>\n" +
    "            <input type=\"radio\" ng-model=\"ctrl.serviceToBind\" ng-value=\"null\">\n" +
    "            <translate>Do not bind at this time.</translate>\n" +
    "          </label>\n" +
    "          <div class=\"bind-description\">\n" +
    "          <span class=\"help-block service-instance-name\" translate>\n" +
    "            Bindings can be created later from within a project.\n" +
    "          </span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"serviceInstance in ctrl.bindableServiceInstances\" class=\"bind-service-selection\">\n" +
    "          <label>\n" +
    "            <input type=\"radio\" ng-model=\"ctrl.serviceToBind\" ng-value=\"serviceInstance\">\n" +
    "            {{ctrl.serviceClasses[serviceInstance.spec.clusterServiceClassRef.name].spec.externalMetadata.displayName || serviceInstance.spec.clusterServiceClassRef.name}}\n" +
    "          </label>\n" +
    "          <div class=\"bind-description\">\n" +
    "            <span class=\"pficon pficon-info\"\n" +
    "                  ng-if=\"!(serviceInstance | isServiceInstanceReady)\"\n" +
    "                  data-content=\"{{'This service is not yet ready. If you bind to it, then the binding will be pending until the service is ready.' | translate}}\"\n" +
    "                  data-toggle=\"popover\"\n" +
    "                  data-trigger=\"hover\">\n" +
    "            </span>\n" +
    "            <span class=\"help-block service-instance-name\">\n" +
    "              {{serviceInstance.metadata.name}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <h4 ng-if=\"!ctrl.bindableServiceInstances.length\">\n" +
    "          <span class=\"pficon pficon-info\" aria-hidden=\"true\"></span>\n" +
    "          <span class=\"help-block service-instance-name\" translate>\n" +
    "            There are no bindable services in this project\n" +
    "          </span>\n" +
    "        </h4>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/binding/bindResults.html',
    "<div ng-if=\"!ctrl.error && !(ctrl.binding | isBindingFailed)\">\n" +
    "  <div ng-if=\"ctrl.binding && !(ctrl.binding | isBindingReady)\" class=\"results-status\">\n" +
    "    <span class=\"fa fa-clock-o text-muted\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\" translate>Pending</span>\n" +
    "    <div class=\"results-message\">\n" +
    "      <h3 translate>\n" +
    "        The binding is being created.\n" +
    "      </h3>\n" +
    "      <p class=\"results-message-details\" translate>This may take several minutes.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"(ctrl.binding | isBindingReady)\">\n" +
    "    <div class=\"results-status\">\n" +
    "      <span class=\"pficon pficon-ok\" aria-hidden=\"true\"></span>\n" +
    "      <span class=\"sr-only\" translate>Success</span>\n" +
    "      <div class=\"results-message\">\n" +
    "        <h3>\n" +
    "          <span ng-if=\"ctrl.bindType === 'application'\">\n" +
    "            <strong>{{ctrl.serviceToBind}}</strong> <translate>has been bound to</translate>\n" +
    "            <strong>{{ctrl.applicationToBind}}</strong> <translate>successfully.</translate>\n" +
    "          </span>\n" +
    "          <span ng-if=\"ctrl.bindType !== 'application'\">\n" +
    "            <span translate>The binding</span><strong>{{ctrl.binding.metadata.name}}</strong><span translate> has been created successfully.</span>\n" +
    "          </span>\n" +
    "        </h3>\n" +
    "        <p class=\"results-message-details\">\n" +
    "          <translate>The binding operation created the secret</translate>\n" +
    "          <a ng-if=\"ctrl.secretHref\" ng-href=\"{{ctrl.secretHref}}\">{{ctrl.binding.spec.secretName}}</a>\n" +
    "          <span ng-if=\"!ctrl.secretHref\">{{ctrl.binding.spec.secretName}}</span>\n" +
    "          <translate>that you may need to reference in your application.</translate>\n" +
    "          <span ng-if=\"ctrl.showPodPresets\" translate>Its data will be available to your application as environment variables.</span>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-info results-info\" ng-if=\"ctrl.bindType === 'application'\">\n" +
    "      <span class=\"pficon pficon-info\" aria-hidden=\"true\"></span>\n" +
    "      <span class=\"sr-only\" translate>Info</span>\n" +
    "      <translate>The binding secret will only be available to new pods. You will need to redeploy your application.</translate>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-if=\"ctrl.error || (ctrl.binding | isBindingFailed)\">\n" +
    "  <div class=\"results-status\">\n" +
    "    <span class=\"pficon pficon-error-circle-o text-danger\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\" translate>Error</span>\n" +
    "    <div class=\"results-message\">\n" +
    "      <h3 translate>\n" +
    "        The binding could not be created.\n" +
    "      </h3>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"ctrl.error\" class=\"sub-title\">\n" +
    "    <span ng-if=\"ctrl.error.data.message\">\n" +
    "      {{ctrl.error.data.message | upperFirst}}\n" +
    "    </span>\n" +
    "    <span ng-if=\"!ctrl.error.data.message\" translate>\n" +
    "      An error occurred creating the binding.\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <div ng-if=\"!ctrl.error\" class=\"sub-title\">\n" +
    "    {{ctrl.binding | bindingFailedMessage}}\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/binding/bindServiceForm.html',
    "<div class=\"bind-form\">\n" +
    "  <form>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        <h3><span translate>Create a binding for</span> <strong>{{ctrl.serviceClass.spec.externalMetadata.displayName || ctrl.serviceClass.spec.externalName}}</strong></h3>\n" +
    "      </label>\n" +
    "      <span class=\"help-block\" translate>Bindings create a secret containing the necessary information for an application to use this service.</span>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "\n" +
    "  <form ng-if=\"ctrl.allowNoBinding || ctrl.showPodPresets\" name=\"ctrl.formName\" class=\"mar-bottom-lg\">\n" +
    "    <fieldset>\n" +
    "      <div class=\"radio\">\n" +
    "        <label ng-if=\"ctrl.showPodPresets\" class=\"bind-choice\" ng-disabled=\"!ctrl.applications.length\">\n" +
    "          <input type=\"radio\" ng-model=\"ctrl.bindType\" value=\"application\" ng-disabled=\"!ctrl.applications.length\" translate>\n" +
    "          Create a secret and inject it into an application\n" +
    "        </label>\n" +
    "        <div ng-if=\"ctrl.showPodPresets\" class=\"application-select\">\n" +
    "          <ui-select ng-model=\"ctrl.appToBind\"\n" +
    "                     ng-disabled=\"ctrl.bindType !== 'application'\"\n" +
    "                     ng-required=\"ctrl.bindType === 'application'\">\n" +
    "            <ui-select-match placeholder=\"{{ctrl.uiSelectMatchPlaceholder}}\">\n" +
    "              <span>\n" +
    "                {{$select.selected.metadata.name}}\n" +
    "                <small class=\"text-muted\">&ndash; {{$select.selected.kind | humanizeKind : true}}</small>\n" +
    "              </span>\n" +
    "            </ui-select-match>\n" +
    "            <ui-select-choices\n" +
    "              repeat=\"application in (ctrl.applications) | filter : { metadata: { name: $select.search } } track by (application | uid)\"\n" +
    "              group-by=\"ctrl.groupByKind\">\n" +
    "              <span ng-bind-html=\"application.metadata.name | highlight : $select.search\"></span>\n" +
    "            </ui-select-choices>\n" +
    "          </ui-select>\n" +
    "        </div>\n" +
    "        <label class=\"bind-choice\">\n" +
    "          <input type=\"radio\" ng-model=\"ctrl.bindType\" value=\"secret-only\">\n" +
    "          <span translate>Create a secret in</span> <strong>{{ctrl.projectName}}</strong> <span translate>to be used later</span>\n" +
    "        </label>\n" +
    "        <div class=\"help-block bind-description\" translate>\n" +
    "          Secrets can be referenced later from an application.\n" +
    "        </div>\n" +
    "        <label ng-if=\"ctrl.allowNoBinding\" class=\"bind-choice\">\n" +
    "          <input type=\"radio\" ng-model=\"ctrl.bindType\" value=\"none\" translate>\n" +
    "          Do not bind at this time\n" +
    "        </label>\n" +
    "        <div ng-if=\"ctrl.allowNoBinding\" class=\"help-block bind-description\" translate>\n" +
    "          Bindings can be created later from within a project.\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/create-project/createProject.html',
    "<form name=\"createProjectForm\" novalidate>\n" +
    "  <fieldset ng-disabled=\"disableInputs\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\" class=\"required\" translate>Name</label>\n" +
    "      <span ng-class=\"{'has-error': (createProjectForm.name.$error.pattern && createProjectForm.name.$touched) || nameTaken}\">\n" +
    "        <input class=\"form-control\"\n" +
    "            name=\"name\"\n" +
    "            id=\"name\"\n" +
    "            placeholder=\"{{'my-project' | translate}}\"\n" +
    "            type=\"text\"\n" +
    "            required\n" +
    "            take-focus\n" +
    "            minlength=\"2\"\n" +
    "            maxlength=\"63\"\n" +
    "            pattern=\"[a-z0-9]([-a-z0-9]*[a-z0-9])?\"\n" +
    "            aria-describedby=\"nameHelp\"\n" +
    "            ng-model=\"name\"\n" +
    "            ng-model-options=\"{ updateOn: 'default blur' }\"\n" +
    "            ng-change=\"nameTaken = false\"\n" +
    "            autocorrect=\"off\"\n" +
    "            autocapitalize=\"off\"\n" +
    "            spellcheck=\"false\">\n" +
    "      </span>\n" +
    "      <div>\n" +
    "        <span class=\"help-block\" translate>A unique name for the project.</span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span id=\"nameHelp\" class=\"help-block\" ng-if=\"createProjectForm.name.$error.required && createProjectForm.name.$dirty\" translate>\n" +
    "          Name is required.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span id=\"nameHelp\" class=\"help-block\" ng-if=\"createProjectForm.name.$error.minlength && createProjectForm.name.$touched\" translate>\n" +
    "          Name must have at least two characters.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span id=\"nameHelp\" class=\"help-block\" ng-if=\"createProjectForm.name.$error.pattern && createProjectForm.name.$touched\" translate>\n" +
    "          Project names may only contain lower-case letters, numbers, and dashes.\n" +
    "          They may not start or end with a dash.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span class=\"help-block\" ng-if=\"nameTaken\" translate>\n" +
    "          This name is already in use. Please choose a different name.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"displayName\" translate>Display Name</label>\n" +
    "      <input class=\"form-control\"\n" +
    "          name=\"displayName\"\n" +
    "          id=\"displayName\"\n" +
    "          placeholder=\"{{'My Project' | translate}}\"\n" +
    "          type=\"text\"\n" +
    "          ng-model=\"displayName\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"description\" translate>Description</label>\n" +
    "      <textarea class=\"form-control\"\n" +
    "          name=\"description\"\n" +
    "          id=\"description\"\n" +
    "          placeholder=\"{{'A short description.' | translate}}\"\n" +
    "          ng-model=\"description\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"button-group\">\n" +
    "      <button type=\"submit\"\n" +
    "          class=\"btn btn-primary\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          ng-click=\"createProject()\"\n" +
    "          ng-disabled=\"createProjectForm.$invalid || nameTaken || disableInputs\"\n" +
    "          value=\"\" translate>\n" +
    "        Create\n" +
    "      </button>\n" +
    "      <button\n" +
    "          class=\"btn btn-default\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          ng-click=\"cancelCreateProject()\" translate>\n" +
    "        Cancel\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "</form>\n"
  );


  $templateCache.put('src/components/delete-project/delete-project-button.html',
    "<div class=\"actions\">\n" +
    "  <!-- Avoid whitespace inside the link -->\n" +
    "  <a href=\"\"\n" +
    "     ng-click=\"$event.stopPropagation(); openDeleteModal()\"\n" +
    "     role=\"button\"\n" +
    "     class=\"action-button\"\n" +
    "     ng-attr-aria-disabled=\"{{disableDelete ? 'true' : undefined}}\"\n" +
    "     ng-class=\"{ 'disabled-link': disableDelete }\"\n" +
    "    ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"\n" +
    "    ></i><span class=\"sr-only\"><span translate>Delete Project</span> {{projectName}}</span></a>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/delete-project/delete-project-modal.html',
    "<div class=\"delete-resource-modal\">\n" +
    "  <!-- Use a form so that the enter key submits when typing a project name to confirm. -->\n" +
    "  <form>\n" +
    "    <div class=\"modal-header\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" aria-label=\"Close\" ng-click=\"cancel()\">\n" +
    "        <span class=\"pficon pficon-close\"></span>\n" +
    "      </button>\n" +
    "      <h1 class=\"modal-title\"><translate>Are you sure you want to delete the project</translate> '<strong>{{project | displayName}}</strong>'?</h1>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "      <p>\n" +
    "        <translate>This will</translate> <strong translate>delete all resources</strong> <translate>associated with the project</translate> {{project | displayName}} <translate>and the action</translate>\n" +
    "        <strong translate>cannot be undone</strong>.  <translate>Make sure this is something you really want to do!</translate>\n" +
    "      </p>\n" +
    "      <div ng-show=\"typeNameToConfirm\">\n" +
    "        <p><translate>Please type</translate> <strong>{{project.metadata.name}}</strong> <translate>to confirm deletion.</translate></p>\n" +
    "        <p>\n" +
    "          <label class=\"sr-only\" for=\"resource-to-delete\" translate>project to delete</label>\n" +
    "          <input\n" +
    "              ng-model=\"confirmName\"\n" +
    "              id=\"resource-to-delete\"\n" +
    "              type=\"text\"\n" +
    "              class=\"form-control input-lg\"\n" +
    "              autocorrect=\"off\"\n" +
    "              autocapitalize=\"off\"\n" +
    "              spellcheck=\"false\"\n" +
    "              autofocus>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "      <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\" translate>Cancel</button>\n" +
    "      <button ng-disabled=\"typeNameToConfirm && confirmName !== project.metadata.name && confirmName !== (project | displayName : false)\" class=\"btn btn-danger\" type=\"submit\" ng-click=\"delete()\" translate>Delete</button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/delete-project/delete-project.html',
    "<a href=\"javascript:void(0)\"\n" +
    "   ng-click=\"openDeleteModal()\"\n" +
    "   role=\"button\"\n" +
    "   ng-attr-aria-disabled=\"{{disableDelete ? 'true' : undefined}}\"\n" +
    "   ng-class=\"{ 'disabled-link': disableDelete }\"\n" +
    ">{{label || 'Delete'}}</a>\n"
  );


  $templateCache.put('src/components/edit-project/editProject.html',
    "<form name=\"editProjectForm\">\n" +
    "  <fieldset ng-disabled=\"disableInputs\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"displayName\" translate>Display Name</label>\n" +
    "      <input class=\"form-control\"\n" +
    "             name=\"displayName\"\n" +
    "             id=\"displayName\"\n" +
    "             placeholder=\"{{'My Project' | translate}}\"\n" +
    "             type=\"text\"\n" +
    "             ng-model=\"editableFields.displayName\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"description\" translate>Description</label>\n" +
    "                    <textarea class=\"form-control\"\n" +
    "                              name=\"description\"\n" +
    "                              id=\"description\"\n" +
    "                              placeholder=\"{{'A short description.' | translate}}\"\n" +
    "                              ng-model=\"editableFields.description\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"button-group\">\n" +
    "      <button type=\"submit\"\n" +
    "              class=\"btn btn-primary\"\n" +
    "              ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "              ng-click=\"update()\"\n" +
    "              ng-disabled=\"editProjectForm.$invalid || disableInputs\"\n" +
    "              value=\"\">{{submitButtonLabel}}</button>\n" +
    "      <button\n" +
    "          class=\"btn btn-default\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          ng-click=\"cancelEditProject()\" translate>\n" +
    "        Cancel\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "</form>\n"
  );


  $templateCache.put('src/components/origin-modal-popup/origin-modal-popup.html',
    "<div class=\"origin-modal-popup tile-click-prevent\" ng-if=\"$ctrl.shown\" ng-style=\"$ctrl.positionStyle\"\n" +
    "     ng-class=\"{'position-above': $ctrl.showAbove, 'position-left': $ctrl.showLeft}\">\n" +
    "  <h4 class=\"origin-modal-popup-title\">\n" +
    "    {{$ctrl.modalTitle}}\n" +
    "  </h4>\n" +
    "  <div ng-transclude></div>\n" +
    "  <a href=\"\" class=\"origin-modal-popup-close\" ng-click=\"$ctrl.onClose()\">\n" +
    "    <span class=\"pficon pficon-close\"></span>\n" +
    "  </a>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/toast-notifications/toast-notifications.html',
    "<div class=\"toast-notifications-list-pf\">\n" +
    "  <div\n" +
    "    ng-repeat=\"(notificationID, notification) in notifications track by notification.trackByID\"\n" +
    "    ng-if=\"!notification.hidden || notification.isHover\"\n" +
    "       ng-mouseenter=\"setHover(notification, true)\" ng-mouseleave=\"setHover(notification, false)\">\n" +
    "    <div class=\"toast-pf alert {{notification.type | alertStatus}}\" ng-class=\"{'alert-dismissable': !hideCloseButton}\">\n" +
    "      <button ng-if=\"!hideCloseButton\" type=\"button\" class=\"close\" ng-click=\"close(notification)\">\n" +
    "        <span class=\"pficon pficon-close\" aria-hidden=\"true\"></span>\n" +
    "        <span class=\"sr-only\" translate>Close</span>\n" +
    "      </button>\n" +
    "      <span class=\"{{notification.type | alertIcon}}\" aria-hidden=\"true\"></span>\n" +
    "      <span class=\"sr-only\">{{notification.type}}</span>\n" +
    "      <span class=\"toast-notification-message\" ng-if=\"notification.message\">{{notification.message}}</span>\n" +
    "      <div ng-if=\"notification.details\" class=\"toast-notification-details\">\n" +
    "        <truncate-long-text\n" +
    "          limit=\"200\"\n" +
    "          content=\"notification.details\"\n" +
    "          use-word-boundary=\"true\"\n" +
    "          expandable=\"true\"\n" +
    "          hide-collapse=\"true\">\n" +
    "        </truncate-long-text>\n" +
    "      </div>\n" +
    "      <span ng-repeat=\"link in notification.links\">\n" +
    "        <a ng-if=\"!link.href\" href=\"\" ng-click=\"onClick(notification, link)\" role=\"button\">{{link.label}}</a>\n" +
    "        <a ng-if=\"link.href\" ng-href=\"{{link.href}}\" ng-attr-target=\"{{link.target}}\">{{link.label}}</a>\n" +
    "        <span ng-if=\"!$last\" class=\"toast-action-divider\">|</span>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/truncate-long-text/truncateLongText.html',
    "<!--\n" +
    "  Do not remove class `truncated-content` (here or below) even though it's not\n" +
    "  styled directly in origin-web-common.  `truncated-content` is used by\n" +
    "  origin-web-console in certain contexts.\n" +
    "\n" +
    "  highlightKeywords and linkify are mutually exclusive options\n" +
    "-->\n" +
    "<span ng-if=\"!truncated\">\n" +
    "  <span ng-if=\"!linkify || (highlightKeywords | size)\" ng-bind-html=\"content | highlightKeywords : keywords\" class=\"truncated-content\"></span>\n" +
    "  <span ng-if=\"linkify && !(highlightKeywords | size)\" ng-bind-html=\"content | linkify : '_blank'\" class=\"truncated-content\"></span>\n" +
    "</span>\n" +
    "<!-- To avoid truncating in middle of a link, we only optionally apply linkify to expanded content -->\n" +
    "<span ng-if=\"truncated\">\n" +
    "  <span ng-if=\"!toggles.expanded\">\n" +
    "    <span ng-attr-title=\"{{content}}\" class=\"truncation-block\">\n" +
    "      <span ng-bind-html=\"truncatedContent | highlightKeywords : keywords\" class=\"truncated-content\"></span>&hellip;\n" +
    "    </span>\n" +
    "    <a ng-if=\"expandable\" href=\"\" ng-click=\"toggles.expanded = true\" class=\"truncation-expand-link\" translate>See All</a>\n" +
    "  </span>\n" +
    "  <span ng-if=\"toggles.expanded\">\n" +
    "    <span ng-if=\"!linkify || (highlightKeywords | size)\"\n" +
    "          ng-bind-html=\"content | highlightKeywords : keywords\"\n" +
    "          class=\"truncated-content\"></span>\n" +
    "    <span ng-if=\"linkify && !(highlightKeywords | size)\"\n" +
    "          ng-bind-html=\"content | linkify : '_blank'\"\n" +
    "          class=\"truncated-content\"></span>\n" +
    "    <a href=\"\" ng-if=\"!hideCollapse\" ng-click=\"toggles.expanded = false\" class=\"truncation-collapse-link\" translate>Collapse</a>\n" +
    "  </span>\n" +
    "</span>\n"
  );

}]);
