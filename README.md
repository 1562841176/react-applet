# react-applet

* ### content-base
设定webpack-dev-server伺服的directory。如果不进行设定的话，默认是在当前目录下。


要注意的一点就是在webpack.config.js文件里面，如果配置了output的publicPath这个字段的值的话，在index.html文件里面也应该做出调整。因为webpack-dev-server伺服的文件是相对publicPath这个路径的。因此，如果你的webpack.config.js配置成这样的：

```
module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js'，
            publicPath: '/assets/'
        }
    }
```

那么，在index.html文件当中引入的路径也发生相应的变化:
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
    </head>
    <body>
        <script src="assets/bundle.js"></script>
    </body>
    </html>
```    
如果在webpack.config.js里面没有配置output的publicPath的话，那么index.html最后引入的文件js文件路径应该是下面这样的。
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
    </head>
    <body>
        <script src="bundle.js"></script>
    </body>
    </html>
```