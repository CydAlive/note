### 1.1MongoDB基础构成

+ database :   数据库，mongoDB数据库软件中可以建立多个数据库
+ collection :   集合(相当于表)，一组数据的集合，可以理解为JavaScript中的数组
+ document :  文档，一条具体的数据，可以理解为JavaScript中的对象
+ field : 字段，文档中的属性名称，可以理解为JavaScript中的对象属性

 ### 2在node中使用MongoDB

+ 使用Node.js操作MongoDB数据库需要依赖Node.js第三方包mongoose
+ 使用**npm install mongoose**命令下载
+ 在命令行工具中运行**net start mongoDB**即可启动MongoDB，否则MongoDB将无法连接。
+ 使用 **net stop mongoDB** 关闭数据库

#### 2.1数据库连接

```shell
//mongodb: 协议名字， localhost:地址， playground:要连接的数据库的名字
mongoose.connect('mongodb://localhost/playground')
     .then(() => console.log('数据库连接成功')) 
     .catch(err => console.log('数据库连接失败', err));
```

#### 2.2创建集合

```shell
  // 设定集合规则
 const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     isPublished: Boolean
 });
  // 创建集合并应用规则，Course：首字母要大写
 const Course = mongoose.model('Course', courseSchema); 
 // courses：在数据库中显示的集合的首字母会变成小写，同时后加s
```

#### 2.3创建文档

+ **第一中插入文档的方法**
  1. 创建集合实例
  2. 调用实例对象下的save方法将数据保存到数据库中

```shell
// 创建集合实例
 const course = new Course({
     name: 'Node.js course',
     author: '测试数据',
     tags: ['node', 'backend'],
     isPublished: true
 });
  // 将数据保存到数据库中
 course.save();
```

+ **第二种插入文档的方法**

```shell
Course.create({name: 'JavaScript基础', author: '测试数据2', isPublish: true}, (err, doc) => { 
     //  错误对象
    console.log(err)
     //  当前插入的文档
    console.log(doc)
});
```

+ **第三种插入文档的方法**

```shell
Course.create({name: 'JavaScript基础', author: '测试数据3', isPublish: true})
      .then(doc => console.log(doc))
      .catch(err => console.log(err))
```

#### 2.4向mondoDB中导入数据

```shell
//使用此命令需要先在环境变量中进行配置，将MongoDB的bin目录添加到path中
mongoimport –d 数据库名称 –c 集合名称 –file 要导入的数据文件
```

#### 2.5查询数据

```shell
//  根据条件查找文档（条件为空则查找所有文档，返回的result无论是几条都是一个数组，没有数据则返回空数组）
Course.find().then(result => console.log(result))
```

```shell
//  根据条件查找文档（findOne:只返回一条数据，默认返回第一条匹配的数据）
Course.findOne({name: 'node.js基础'}).then(result => console.log(result))
```

```shell
//  匹配$gt:大于 $lt:小于
 Course.find({age: {$gt: 20, $lt: 50}}).then(result => console.log(result))
```

```shel
 // $in: 匹配包含
 Course.find({hobbies: {$in: ['敲代码']}}).then(result => console.log(result))
```

```shell
//  选择要查询的字段,-id：不想查询那个字段就在前面加一个‘-’ 
 Course.find().select('name email -id').then(result => console.log(result))
```

```shell
// 将数据按照年龄进行排序
 Course.find().sort('age').then(result => console.log(result))
// -age：倒叙则在前面加‘-’
 Course.find().sort('-age').then(result => console.log(result))
```

```shel
 //  skip 跳过多少条数据  limit 限制查询数量
 Course.find().skip(2).limit(2).then(result => console.log(result))
```

#### 2.6删除文档

```shell
// 删除单个,如果有多个匹配的，默认只删除第一个，{}中填写筛选的条件，返回值是删除的数据
Course.findOneAndDelete({}).then(result => console.log(result))
 // 删除多个
Course.deleteMany({}).then(result => console.log(result))
```

#### 2.7更新文档

```shell
// 更新单个,如果匹配多个，则默认删除第一个
User.updateOne({查询条件}, {要修改的值}).then(result => console.log(result))
```

```shel
// 更新多个
User.updateMany({查询条件}, {要更改的值}).then(result => console.log(result))
```

#### 2.8验证规则

传入两个数据需要使用[ ]，第二个为自定义错误信息

![image-20191231141357673](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191231141357673.png)

+ required: true 必传字段
+ minlength：3 字符串最小长度
+ maxlength: 20 字符串最大长度
+ min: 2 数值最小为2
+ max: 100 数值最大为100
+ enum: ['html'**,** 'css'**,** 'javascript'**,** 'node.js']     当前字段只能传入数组内的参数
+ trim: true 去除字符串两边的空格
+ validate: 自定义验证器
+ default: 默认值
+ unique：true 此字段不能重复

#### 2.9获取错误信息

![image-20191231144105935](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191231144105935.png)

#### 2.10集合关联

```shell
// 用户集合
const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } })); 
// 文章集合
const Post = mongoose.model('Post', new mongoose.Schema({
    title: { type: String },
    // 使用ID将文章集合和作者集合进行关联
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));
//联合查询
Post.find()
      .populate('author')
      .then((err, result) => console.log(result));
```

