module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: {
          // 自动识别html中的Translate对应的字符串，放到po/template.pot文件中
          // 然后用工具，把.pot中的翻译，转到.po中
          'po/template.pot': ['src/*/*/*.html', 
                              'src/*.js', 
                              'src/*/*.js',
                              'src/*/*/*.js'
                             ]
        }
      }
    },

    nggettext_compile: {
      all: {
        files: {
          // 把po中的翻译转到static/js/translations.js中，供项目加载，就有翻译啦
          'po/translations-common.js': ['po/*.po']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-gettext');

  grunt.registerTask('default', ['nggettext_extract', 'nggettext_compile']);
};
