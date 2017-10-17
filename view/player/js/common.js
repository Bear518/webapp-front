//build node tools/r.js -o tools/build.js config
// requirejs.config({
//     baseUrl: '.',
//     paths: {
//         js: '.',
//         templates:'../templates',
//         app:'.'
//     }
// });
//dev config
requirejs.config({
    baseUrl: '/view/player/js',
    paths: {
        js: '/view/player/js',
        templates:'/view/player/templates',
        app:'.'
    }
});