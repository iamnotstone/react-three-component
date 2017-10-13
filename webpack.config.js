var path=require("path");
module.exports = {
  entry:{
    index:path.resolve(__dirname, "./src/react-three-component.js"),
  },
  output:{
    path:path.resolve(__dirname, "./dist/"),
	  filename:"react-three-component.js",
		library: 'ReactThreeComponent',
		libraryTarget: 'umd',
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
  watch : false,

	externals:{
	  three:{
		  root: 'THREE',
			commonjs2: 'three',
			commonjs: 'three',
			amd: 'three'
		},
		react:{
		  root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}

	}
};
