## 基础

##### 闭包的作用

+ 延伸了变量的作用范围，在函数外部可以访问内部的变量

##### 什么是递归

+ 简单的理解就是函数内部自己调用自己，这个函数就是递归函数；**递归函数中必须加退出条件**

## ES5

#### 1. this的指向

#### 2. splice( )

​	`arr.aplice(1)` //只填一个元素，则删除第n个后面的所有

​	`arr.aplice(1,3)`// 删除第一个后边的三个元素

​	`arr.aplice(1,3,'a','b)`//第二个后边为替换的元素

#### 3.toFixed( )



## ES6 

#### 1. 箭头函数

+ 如果只有一个形参可以省略( )，如果函数体中只有一行函数可以省略{ }

+ 箭头函数不绑定this关键字，箭头函数没有自己的this关键字，如果在箭头函数中使用this，this关键字将指向箭头函数定义位置中的this

#### 2.剩余参数

+ `let [A, ...arr] =  [1,2,3,4,5]` arr会接收除1之外的所有
+ `let  arr3 = [...arr1, ...arr2]`这种方法可以合并两个数组
+ `var str = 'hello'  console.log([...str])//[ "h", "e", "l", "l", "o" ]` ...可以将其变为一个数组

#### 3. 数组扩展方法

##### 	1. Array.from( )

​	`Array.from(arr, item => item*2)`

​	可以将一个伪数组转换成真的数组，同时在可以传入一个函数	对数组中的每一项进行处理。

##### 	2. find( )

​	`arr.find((item, index) => item.id == 3)`

​	查找数组中第一个满足条件的值，如果没有满足的则返回undefined。

##### 	3. findIndex( )

​	`arr.findIndex(item => item == 3)`

​	返回数组中第一个满足条件的值的下标。

##### 	4. includes( )

​	`arr.includes('a')`

​	判断数组是否包含某个值，有则返回**true**，没有返回**false**

##### 5. sort( )

 	`arr.sort((a, b) => a -b)`

​	 `arr.sort((a, b) => a + b)`

​	对数组进行排序，a - b 正序，a + b倒叙

##### 6. map( )

​	`let arr = arr.map(item => item*item)`

​	map( ) 会遍历数组，但是不会改变原数组，而是返回一个新数组

##### 7. reduce( )

```shel
//reduce()需要传入两个元素，第一个是一个方法，方法中也需要两个参数，prevalue是指上一次遍历的返回值，如果是第一次遍历使用的则是reduce()中传入的第二个元素，item是每次的遍历项，第二个元素就是prevalue的初始值
arr.reduce(function(preValue, item){
	return preValue + item
},0)

arr.reduce((preValue, item) => preValue + item)
```

##### 8. filter( )

​	`let arr = arr,filter(item => item = 3)`

​	filter( ) 只会返回满足条件的值,判断是**turn**还是**false**，turn则把本次item加入arr中

##### 9. forEach( )

​	`let arr2 = arr.forEach((item, index) => 	console.log(index,item))`//undefined

​	对数组或伪数组进行遍历，可以只传item

##### 10. some( )

​	` let arr2 = arr.some(item => item < 5)`//ture || false

​	查找数组中是否有满足条件的，有真即为真

##### 11. every( )

​	` let arr2 = arr.every(item => item < 5)`//ture || false

​	全都满足条件才会返回真，有假即为假

#### 4. 字符串的扩展方法

##### 	1.  string的扩展方法

```
let a = '张三'
let b = `my name is ${a}`  //my name is 张三
```

##### 2. startSwith和endSwith

​	`str.startsWith('hello')`判断字符串是否已**hello**开头，返回ture或false

​	`str.endsWith('word')`判断字符串是否以**word**结尾，返回ture或false

##### 3. repeat( )

​	`str.repeat(n)`将字符串重复n次

#### 5. set构造函数

​	set 数据结构类似于数组，但是成员的值是唯一的，没有重复的值。

​	set 本事是一个构造函数，用来生成set 数据结构。

​	`let a = new Set（）`

​	`let a = new Set（[1,2,1,5]）//[1,2,5]`

​	`a.size //3`

##### 1.set.add( )

​	`a.add(1)//1`

​	使用set 实例的add( )方法添加数据, 只能填入一个参数

##### 2.set.delete( )

​	`a.delete(1)`

​	删除a中的1，返回true 或 false

##### 3. set.has( )

​	`a.has(1)`

​	判断a中是否有1，返回true 或 false

##### 4.set.clear( )

​	`a.clear()`

​	清楚a中的数据，没有返回值，undefined

##### 5. 从set 数据结构中取值

​	`a.forEach(item => console.log（item））`

​	将a 中的数据依次输出

#### 6.JSON的新应用

##### 1.JSON.stringifg( )

​	`	let str = JSON.stringifg(obj)`

​	将**json**转换成字符串（序列化）

##### 2.JSON.parse( )

​	`let obj = JSON.parse(str)`

​	将字符串转换成**json**数据格式

#### 7.Promise的应用

​	**Promise**是**异步编程**的一种解决方案，可以解决**回调地狱**问题

##### 1. 基础应用

Promise实例需要传入两个形参，resolve和reject，可以在内部进行进行判断什么时候执行相应的函数，

Promise实例可以使用 **.then** 进行链式编程，在Promise中的resolve被执行时就会执行 **.then** 中传入的函数；

​					同理 **.catch** 会在reject执行时执行其内部传入的函数

图一：使用**.then  .catch** 判断

![1581229753283](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581229753283.png)

图二： 在 **.then** 中传入两个函数，第一个会在 resolve 执行时执行，第二个会在 reject 执行时执行（这种方法不需要再使用  **.catch**）

![1581230399963](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581230399963.png)

##### 2. 链式调用

then 中  return 的返回值，可以继续使用 .then接收

![1581232855843](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581232855843.png)

##### 3. Promise.all( )

在多个异步操作完成后才能继续执行的时候，可以使用这种方式

.then 会在所有[ ]中的promise执行后触发

![1581234162283](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581234162283.png)

#### 8.async和await

​	使用**async**修饰的函数，返回的是一个**promise**对象

```js
正常返回的promise需要用.then接受到返回的数据，而使用async修饰过的函数(方法)，在异步操作前添加await，会等待异步操作结束后继续向下执行，同时会直接返回数据
async getData() {
    //在这里会等待，直到data接收到返回的数据
    const data = await wx.request({url:'/home'})
}
```



#### 9. generator

```shell
需要使用 * 对函数名修饰
每next（）一次就会执行段代码
function *name() {
            console.log(1);
            //a等于next（）传进来的10，同时将return a 返回回去
            let a = yield 'return a'
            console.log(2 + a);
            //a等于next（）传进来的10，同时将return b 返回回去
            let b = yield 'return b'
            console.log(3 + b);
        }
        let a = name()
        //10会传递到函数内部，但第一次next（）可以理解为启动函数，内部接收不到参数
        let one = a.next(10)
        //20会被第一个yield接收到，同时接收到返回的对象，one是一个包含value:return a的对象
        let tow = a.next(20)
        //30会被第二个yield接收到，同时接收到返回的对象，two是一个包含value:return b的对象
        let three = a.next(30)
        console.log(one, tow, three);
```

#### 10. Map数据结构

#### 11. fetch

