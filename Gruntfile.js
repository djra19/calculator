module.exports = function(grunt) {
  grunt.initConfig({
  	jshint: {
  	  default: {
  	  	src: ["src/scripts/base/**/*.js", "src/scripts/root/**/*.js"]
  	  }
  	},

  	cssnano: {
  	  options: {
        autoprefixer: {
          add: true,
          browsers: ["Chrome >= 10", "Explorer >= 9", "Firefox >= 4"]
        }
  	  },

  	  default: {
  	  	files: [{
  	  		expand: true,
  	  		cwd: "src",
  	  		src: ["style/base/**/*.css"],
  	  		dest: "out/"
  	  	}]
  	  }
  	},

    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: [
              "index.html",
              "favicon.ico",
              "style/thirdparty/**/*",
              "scripts/base/**/*",
              "scripts/thirdparty/**/*",
              "res/**/*"
            ],
            dest: "out/"
          },
          {
            expand: true,
            cwd: "src/scripts/root/",
            src: [ "**/*" ],
            dest: "out/"
          },
          {
            src: ["manifests/manifest.json"],
            dest: "out/manifest.json"
          }
        ]
      },

      b2g: {
        files: [
          {
            src: ["manifests/manifest.webapp"],
            dest: "out/manifest.webapp"
          }
        ]
      }
    },

    compress: {
      b2g: {
        options: {
          archive: "out/b2g_export.zip"
        },

        files: [
          {
            expand: true,
            cwd: "src",
            src: ["**"]
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-cssnano");

  grunt.registerTask("default", ["jshint", "cssnano", "copy:default"]);
  grunt.registerTask("b2g", ["default", "copy:b2g", "compress:b2g"]);
}