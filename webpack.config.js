var path=require("path");
module.exports = {
    entry:{
        index:path.resolve(__dirname, "./client/src/index.js"),
    },
    output:{
                path:path.resolve(__dirname, "./client/dist/js"),
	filename:"[name].bundle.js"
    },
    module : {
        loaders: [ { 
                test   : /\.js$|.jsx$/,
                loader : 'babel-loader',
		query: {
          		presets: ['es2015', 'react','stage-2']
        	}
            },
	]
    },
    watch : false
};
