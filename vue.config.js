module.exports = {
 // vue.config.js
  // 选项...
  publicPath:"./",
  outputDir:"dist",
  assetsDir:"assets",
  indexPath:"index.html",
  filenameHashing:true,
  pluginOptions: {
    electronBuilder: {
        builderOptions: {
            // win: {
            //     icon: './public/fengjing.ico'
            // },
            // mac: {
            //     icon: './public/fengjing.ico'
            // },
            productName: '梯方在线'
        }
    },
    
},
css: {
  loaderOptions: { // 向 CSS 相关的 loader 传递选项
    less: {
      javascriptEnabled: true
    }
  }
},
  pages:{
    index: {
      // entry for the pages
      entry: 'src/main.js',
      // the source template
      template: 'src/public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: '首页',
      // chunks to include on this pages, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // test:{
    //     // entry for the pages
    //     entry: 'src/pages/test/test.js',
    //     // the source template
    //     template: 'src/public/test.html',
    //     // output as dist/index.html
    //     filename: 'test.html',
    //     // when using title option,
    //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: '测试',
    //     // chunks to include on this pages, by default includes
    //     // extracted common chunks and vendor chunks.
    //     chunks: ['chunk-vendors', 'chunk-common', 'test']
    // }
  },
  lintOnSave:true,
  runtimeCompiler:false,
  transpileDependencies:[],
  productionSourceMap:false,
  crossorigin:undefined,
  integrity:false,
  devServer:{//代理
      port:8086,
      proxy:'http://192.168.255.201:8082'
  }

}