var modRewrite  = require('connect-modrewrite');

module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 8081
        }
    },
    "files": [
		"dist/*.css",
		"dist/*.js"
	],
    "watchOptions": {},
    "server": {
		baseDir: "./",
        middleware: function (req, res, next) {
            //res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
	},
    "proxy": false,
    "port": 3000
};