### 1.创建web服务器

node  index.js(文件名) 运行nodejs文件

加载使用 require

导出使用 export

```shell
  // 引用系统模块
 const http = require('http');
  // 创建web服务器
 const app = http.createServer();
  // 当客户端发送请求的时候
 app.on('request', (req, res) => {
        //  响应
       res.end('<h1>hi, user</h1>');
 });
  // 监听3000端口
 app.listen(3000);
 console.log('服务器已启动，监听3000端口，请访问 localhost:3000')
```

#### 1.1请求报文

```shell
 app.on('request', (req, res) => {
     req.headers  // 获取请求报文
     req.url      // 获取请求地址
     req.method   // 获取请求方法
 });
```

#### 1.2响应报文

```shell
app.on('request', (req, res) => {
     // 设置响应报文
     res.writeHead(200, {        
     'Content-Type': 'text/html;charset=utf8‘
     });
 });
```

请求内容类型

+ text/html

+ text/css

+ application/javascript

+ image/jpeg

+ application/json

  

### 2.接收post请求参数