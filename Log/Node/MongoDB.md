### 1.1MongoDB基础构成

+ database :   数据库，mongoDB数据库软件中可以建立多个数据库
+ collection :   集合(相当于表)，一组数据的集合，可以理解为JavaScript中的数组
+ document :  文档，一条具体的数据，可以理解为JavaScript中的对象
+ field : 字段，文档中的属性名称，可以理解为JavaScript中的对象属性

 ### 2在node中使用MongoDB

+ 使用Node.js操作MongoDB数据库需要依赖Node.js第三方包mongoose
+ 使用**npm install mongoose**命令下载
+ 在命令行工具中运行**net start mongoDB**即可启动MongoDB，否则MongoDB将无法连接。
+ 使用 **net start mongoDB** 关闭数据库

#### 2.1数据库连接

```shell
//mongodb: 协议名字， localhost:地址， playground:要连接的数据库的名字
mongoose.connect('mongodb://localhost/playground')
     .then(() => console.log('数据库连接成功')) 
     .catch(err => console.log('数据库连接失败', err));
```

#### 2.2创建集合

```shell

```

