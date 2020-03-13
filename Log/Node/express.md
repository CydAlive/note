### 1.在Express 中配置使用atr-template 

+ npm init
+ npm install  express
+ npm install -global nodemon 无需重启刷新服务器 ：使用nodemon index.js(文件名)启动文件
+ npm install  art-template
+ npm install  express-are-template
  

### 2.中间件的使用

#### 	2.1什么是中间件

中间件主要由两部分构成，中间件方法以及请求处理函数。

中间件方法由Express提供，负责拦截请求，请求处理函数由开发人员提供，负责处理请求。

可以针对同一个请求设置多个中间件，对同一个请求进行多次处理。

默认情况下，请求从上到下依次匹配中间件，**一旦匹配成功，终止匹配**。

可以调用next方法将请求的控制权交给下一个中间件，直到遇到结束请求的中间件。

```shell
 app.get('请求路径', '处理函数')   // 接收并处理get请求
 app.post('请求路径', '处理函数')  // 接收并处理post请求
 
 app.get('/request', (req, res, next) => {
     req.name = "张三";
     next();
 });
 app.get('/request', (req, res) => {
     res.send(req.name);
 });
```

#### 2.2中间件的应用

**app.use**中间件用法

```shell
app.use 匹配所有的请求方式，可以直接传入请求处理函数，代表接收所有的请求。

app.use((req, res, next) => {
     console.log(req.url);
     next();
 });
```

```she
app.use 第一个参数也可以传入请求地址，代表不论什么请求方式，只要是这个请求地址就接收这个请求。

app.use('/admin', (req, res, next) => {
     console.log(req.url);
     next();
 });
```

**常见的中间件的使用**

+ 路由保护，客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面。
+ 网站维护公告，在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。
+ 自定义404页面

**错误处理中间件**--捕获错误

1. 在node.js中，异步API的错误信息都是通过回调函数获取的，支持Promise对象的异步API发生错误可以通过catch方法捕获。

   异步函数执行如果发生错误要如何捕获错误呢？

2. try catch 可以捕获异步函数以及其他同步代码在执行过程中发生的错误，但是不能其他类型的API发生的错误。

   ```shell
    //系统会尝试执行try中的代码，如果发生错误执行catch中的代码，没有错误则跳过catch继续向下执行
    app.get("/", async (req, res, next) => {
        try {
            await User.find({name: '张三'})
        }catch(ex) {
            next(ex);
        }
    });
    //通过next（）将错误传递给下一个中间件，status设置返回的状态值
    app.use((err, req, res, next) => {
        res.status(500).send('服务器发生未知错误');
    })
   ```

### 3.构建模块化路由

```shell
 const express = require('express') 
 // 创建路由对象
 const home = express.Router();
 // 将路由和请求路径进行匹配
 app.use('/home', home);
  // 在home路由下继续创建路由
 home.get('/index', () => {
          //  /home/index
         res.send('欢迎来到博客展示页面');
 });
```

![image-20200103134323931](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103134323931.png)

### 4.express请求处理

#### 4.1 GET参数的获取

​	Express框架中使用**req.query**即可获取GET参数，框架内部会将GET参数转换为对象并返回

```shell
// 接收地址栏中问号后面的参数
 // 例如: http://localhost:3000/?name=zhangsan&age=30
 app.get('/', (req, res) => {
    console.log(req.query); // {"name": "zhangsan", "age": "30"}
 });
```

#### 4.2 POST参数的获取

Express中接收post请求参数需要借助第三方包 body-parser,首先使用命令行下载包，引入之后需要进行配置，通过req.body可以获取到请求数据：

```shell
 // 引入body-parser模块
 const bodyParser = require('body-parser');
 // 配置body-parser模块
 app.use(bodyParser.urlencoded({ extended: false }));
 // 接收请求
 app.post('/add', (req, res) => {
    // 接收请求参数
    console.log(req.body);
 }) 
```

### 5.express路由参数

```shell
 app.get('/find/:id', (req, res) => { 
     console.log(req.params); // {id: 123} 
 });
```

```shell
localhost:3000/find/123
```

### 6.静态资源的处理

通过Express内置的**express.static**可以方便地托管静态文件，例如img、CSS、JavaScript 文件等。

```shell
//当以/public/开头请求的时候，去./public/文件夹查找
app.use('/public/',express.static('./public/'));
//省略第一个参数，会直接公开public文件夹
app.use(express.static('public'));
```

### 7.express-art-template模板引擎

1. 为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template。
2. 使用npm install art-template express-art-template命令进行安装。

```shell
  // 当渲染后缀为art的模板时 使用express-art-template
 app.engine('art', require('express-art-template'));
  // 设置模板存放目录（不设置时默认就是views目录）
 app.set('views', path.join(__dirname, 'views'));
  // 渲染模板时不写后缀 默认拼接art后缀
 app.set('view engine', 'art');
 app.get('/', (req, res) => {
     // 渲染模板 index:模板，后面的对象填入数据，在模板文件中可以直接使用填入的数据
     res.render('index',{
     	msg:'message'
     });
 }); 
```

**app.locals** 对象

将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到。

```shel
 app.locals.users = [{
     name: '张三',
     age: 20
 },{
     name: '李四',
     age: 20
}]
```

