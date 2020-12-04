const path = require('path');

module.exports = {
    //This file contains one object wherein we configure our setup
    // 4 key concepts in weback:
    // 1. entry point
    entry: './src/js/index.js',

    // 2. output
    output: {
        path: path.resolve(__dirname, 'dist/js'), //must be an absolute path, requires path package in order to do so
        filename: 'bundle.js'
    },
    mode: 'development'
    // 3. loaders
    // 4. plugins

}