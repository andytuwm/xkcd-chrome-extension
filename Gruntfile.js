module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        preserveComments: false,
        screwIE8: true
      },
      my_target: {
        files: {
          'bin/xkcd-handler.js': ['xkcd-handler.js']
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'bin/xkcd.html': 'xkcd.html',     // 'destination': 'source'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'bin/css/xkcd.css': ['css/xkcd.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['uglify','htmlmin','cssmin']);
};