# react-applet  ## [查看](https://www.jianshu.com/p/324fd1c124ad)

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

* ### Automatic Refresh
webpack-dev-server支持2种自动刷新的方式：

  * Iframe mode
  * inline mode

  当使用Iframe mode时，请求/webpack-dev-server/index.html路径时，会返client/index.html文件

  使用inline mode的时候,访问的路径是:localhost:8080/index.html

  * ### Hot Module Replacement

  
记录下webpack-dev-server的用法.

首先，我们来看看基本的webpack.config.js的写法

    module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }
配置文件提供一个入口和一个出口，webpack根据这个来进行js的打包和编译工作。虽然webpack提供了webpack --watch的命令来动态监听文件的改变并实时打包，输出新bundle.js文件，这样文件多了之后打包速度会很慢，此外这样的打包的方式不能做到hot replace，即每次webpack编译之后，你还需要手动刷新浏览器。

webpack-dev-server其中部分功能就能克服上面的2个问题。webpack-dev-server主要是启动了一个使用express的Http服务器。它的作用主要是用来伺服资源文件。此外这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，即上面配置的:

    output: {
        path: './dist/js',
        filename: 'bundle.js'
    }
注意：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件

下面来结合webpack的文档和webpack-dev-server里部分源码来说明下如何使用：

启动
启动webpack-dev-server有2种方式：

通过cmd line

通过Node.js API

配置
我主要讲解下cmd line的形式,Node.js API形式大家去看下官方文档。可通过npm script进行启动。我的目录结构是:

    app
    |__dist
    |   |__styles
    |   |__js
    |       |__bundle.js
    |   |__index.html
    |__src
    |   |__styles
    |   |__js
    |       |__index.js
    |__node_modules
    |__package.json
    |__webpack.config.js
content-base
设定webpack-dev-server伺服的directory。如果不进行设定的话，默认是在当前目录下。

webpack-dev-server --content-base ./dist
这个时候还要注意的一点就是在webpack.config.js文件里面，如果配置了output的publicPath这个字段的值的话，在index.html文件里面也应该做出调整。因为webpack-dev-server伺服的文件是相对publicPath这个路径的。因此，如果你的webpack.config.js配置成这样的：

    module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js'，
            publicPath: '/assets/'
        }
    }
那么，在index.html文件当中引入的路径也发生相应的变化:

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
如果在webpack.config.js里面没有配置output的publicPath的话，那么index.html最后引入的文件js文件路径应该是下面这样的。

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
Automatic Refresh
webpack-dev-server支持2种自动刷新的方式：

Iframe mode

inline mode

这2种模式配置的方式和访问的路径稍微有点区别，最主要的区别还是Iframe mode是在网页中嵌入了一个iframe，将我们自己的应用注入到这个iframe当中去，因此每次你修改的文件后，都是这个iframe进行了reload。

通过查看webpack-dev-server的源码，lib路径下的Server.js文件，第38-48行，分别新建几个流，这几个流保存了client文件夹下的相关文件：

    // Prepare live html page
    var livePage = this.livePage = new StreamCache();
    fs.createReadStream(path.join(__dirname, "..", "client", "live.html")).pipe(livePage);

    // Prepare the live js file
    var liveJs = new StreamCache();
    fs.createReadStream(path.join(__dirname, "..", "client", "live.bundle.js")).pipe(liveJs);

    // Prepare the inlined js file
    var inlinedJs = new StreamCache();
    fs.createReadStream(path.join(__dirname, "..", "client", "index.bundle.js")).pipe(inlinedJs);
    // Init express server
    var app = this.app = new express();

    // middleware for serving webpack bundle
    this.middleware = webpackDevMiddleware(compiler, options);

    app.get("/__webpack_dev_server__/live.bundle.js", function(req, res) {
        res.setHeader("Content-Type", "application/javascript");
        liveJs.pipe(res);
    });

    app.get("/webpack-dev-server.js", function(req, res) {
        res.setHeader("Content-Type", "application/javascript");
        inlinedJs.pipe(res);
    });

    app.get("/webpack-dev-server/*", function(req, res) {
        res.setHeader("Content-Type", "text/html");
        this.livePage.pipe(res);
    }.bind(this));
当使用Iframe mode时，请求/webpack-dev-server/index.html路径时，会返回client/index.html文件，这个文件的内容就是：

<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta charset="utf-8"/><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/><script type="text/javascript" charset="utf-8" src="/__webpack_dev_server__/live.bundle.js"></script></head><body></body></html>
这个页面会请求live.bundle.js,其中里面会新建一个Iframe，你的应用就被注入到了这个Iframe当中。同时live.bundle.js中含有socket.io的client代码，这样它就能和webpack-dev-server建立的http server进行websocket通讯了。并根据返回的信息完成相应的动作。

而Inline-mode，是webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,

    module.exports = {
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:8080/',
                './src/js/index.js'
            ]
        },
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }
这样就完成了将inlinedJS打包进bundle.js里的功能，同时inlinedJS里面也包含了socket.io的client代码，可以和webpack-dev-server进行websocket通讯。

当然你也可以直接在你index.html引入这部分代码:

<script src="http://localhost:8080/webpack-dev-server.js"></script>

不过Iframe mode和Inline mode最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的reload的。

Iframe mode
Iframe mode下cmd line不需要添加其他的内容，浏览器访问的路径是:


localhost:8080/webpack-dev-server/index.html。
这个时候这个页面的header部分会出现整个reload消息的状态。当时改变源文件的时候，即可以完成自动编译打包，页面自动刷新的功能。

图片描述

Inline mode
使用inline mode的时候，cmd line需要写成：

webpack-dev-server --inline --content-base ./dist
这个时候访问的路径是:

localhost:8080/index.html
也能完成自动编译打包，页面自动刷新的功能。但是没有的header部分的reload消息的显示，不过在控制台中会显示reload的状态。


* ### Hot Module Replacement

开启Hot Module Replacement功能，在cmd line里面添加--hot
`webpack-dev-server --hot --inline --content-base ./dist`
* ### 其他配置选项
```
--quiet 控制台中不输出打包的信息
--compress 开启gzip压缩
--progress 显示打包的进度
```