var path=require("path");
var webpack = require("webpack");
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
		},
    'react-dom':{
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom'
    },
    'prop-types':{
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
      umd: 'prop-types'
    }

	},
/*  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]*/
};
