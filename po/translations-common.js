angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('zh_CN', {"A unique name for the project.":"项目的唯一名称","lala":"啦啦","Name":"名称"});
/* jshint +W100 */
}]);