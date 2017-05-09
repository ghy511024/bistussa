
/**
 * wiki 博客类，fis 配置。
 * 情况比较特殊，由于发布上线并不是服务器环境，主要针对github 的静态网页，希望编译好的东西就在本项目中，
 * 而不是单独一个产出文件夹，这样便于git 提交。所以采用发布到项目根目录本身。弊端就是，配置不好容易死循环。
 * 
 * */

fis.match('*', {
    release: false
})
//===================== 资源发布地址  ===================

fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass', {
    }),
    optimizer: fis.plugin('clean-css')
});

fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
//    optimizer: fis.plugin('uglify-js')
});

fis.match('src/({images,js,css}/**)', {
    release: "static/$1"
}).match('src/page/(**)', {
    release: "page/$1"
}).match('**index.html', {
    release: "/index.html"
})
//===================== 忽略规则  ===================
fis.set('project.ignore', [
    '**/nbproject/**',
    'dist/**',
    '**/bat/**',
    '**/static/**',
    'node_modules/**',
    '.git/**',
    '.svn/**',
    "**conf.js",
    '**.bat'
]);
