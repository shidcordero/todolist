const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = (env, argv) => ({
	// Base directory for resolving entry points.
	context: path.resolve(__dirname, 'app'),
	// Where to start building the dependency tree.
	entry: ['babel-polyfill', '/'],
	// Where to transpile the final JS file.
	output: {
		path: path.join(__dirname, '../../../public/assets'),
		filename: 'bundle.js',
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	target: 'web',
	// Webpack auto-enables some plugins depending on this value. See: https://webpack.js.org/concepts/mode
	mode: 'development',
	// Options for resolving module requests.
	resolve: {
		// Directories where to look for modules.
		modules: [
			'node_modules',
			path.join(__dirname, 'app'),
		],
		alias: {
			scenes: path.join(__dirname, 'app/scenes'),
			components: path.join(__dirname, 'app/components'),
			services: path.join(__dirname, 'app/services'),
		},
	},
	// Configure webpack-dev-server.
	devServer: {
		hot: true,
  },
	module: {
		rules: [
			// Transpile JS/JSX.
			{
				test: /\.jsx?$/,
				use: [
					'babel-loader',
				],
				exclude: /node_modules/
			},
			// Transpile CSS.
			{
				test: /\.css$/,
				use: [
					argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader?modules',
				],
			},
		],
	},
	plugins: [
		// Enable HMR
		new webpack.HotModuleReplacementPlugin(),
		// Plugin to create the separate CSS bundle file.
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
		// Enable the fancy CLI dashobard.
		new DashboardPlugin(),
	],
	// A SourceMap is added as DataUrl to the JavaScript file.
	devtool: 'inline-source-map',
});
