module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		release: {
			options: {
				github: { 
					repo: 'hoxton-one/deepstream.io-tools-ko',
					usernameVar: 'GITHUB_USERNAME',
					passwordVar: 'GITHUB_PASSWORD'
				}
			}
		},
		concat: {
			options: {
				banner: '(function(){',
				footer: '})();'
			},
			dist: {
				src: ['src/*'],
				dest: 'dist/ko-tools.js',
			}
		},
		uglify: {
			dist: {
				files: { 'dist/ko-tools.min.js': [ 'dist/ko-tools.js' ] }
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-release' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'build', [ 'concat:dist', 'uglify:dist' ] );
};