const mix = require('laravel-mix');
const local = require('./local-config');
const requireResolve = require('resolve');

// get molnarg's http2 module
// const http2Module = require(requireResolve.sync('http2', { basedir: process.cwd() }));
require('laravel-mix-versionhash');
require('laravel-mix-tailwind');
const fs = require("fs");



function findFiles(dir) {
    const fs = require('fs');
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
}

function buildSass(dir, dest) {
    findFiles(dir).forEach(function (file) {
        if ( ! file.startsWith('_') && ! file.startsWith('.')) {
            mix.sass(dir + '/' + file, dest);
        }
    });
}

function buildJs(dir, dest) {
    findFiles(dir).forEach(function (file) {
        if ( ! file.startsWith('_') && ! file.startsWith('.')) {
            mix.js(dir + '/' + file, dest);
        }
    });
}


mix.setPublicPath('./build');

mix.webpackConfig({
    externals: {
        // 'alpinejs': "Alpine",
        //"jquery": "jQuery",
    }
});

if (local.proxy) {
    var bs_config = {
        proxy: local.proxy,
        injectChanges: true,
        https: local.https ? local.https : false,
        // httpModule: http2Module,
        open: (local.open == true),
        files: [
            'index.html',
            'build/**/*.{css,js}'
        ]
    } ;
    //console.info('browserSync_config - ' , bs_config);
    mix.browserSync(bs_config);
}

mix.tailwind();
mix.js('assets/js/app.js', 'js');

// buildJs('assets/js/components/alpine/','js/components/alpine/');


buildSass('assets/scss/', 'css');
if (mix.inProduction()) {
    mix.version(); //WPO не хочет с атрибутами склеивать файлы
    mix.sourceMaps();
}
