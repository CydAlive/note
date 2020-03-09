## flex布局

flex: flexible、弹性布局

#### 一、开启flex布局

```makefile
//定义后为块级元素
display: flex;
//定义后为行内元素
display: inline-flex;
```

#### 二、container中属性

##### 2.1 flex-direction

改变主轴方向

```makefile
//默认情况 从左到右
flex-direction: row;
//反转 从右到左
flex-direction: row-reverse;
//列 从上到下
flex-direction: column;
//列反转 从下到上
flex-direction: column-reverse;
```

##### 2.2 justify-content

决定flex-items的对齐方式

![Screenshot_2020-02-20-11-04-52-166](F:\note\Log\images\Screenshot_2020-02-20-11-04-52-166.png)

##### 2.3 align-items

决定了flex-tiems在cross axis上的对齐方式

![Screenshot_2020-02-20-11-19-11-787_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-11-19-11-787_哔哩哔哩.png)

##### 2.4 flex-wrap及flex-flow

![Screenshot_2020-02-20-20-38-30-153_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-20-38-30-153_哔哩哔哩.png)

#####  2.5 align-content

![Screenshot_2020-02-20-20-48-34-187_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-20-48-34-187_哔哩哔哩.png)

#### 三、flex-item中的属性

##### 3.1 order

数字越小越靠前

![Screenshot_2020-02-20-21-06-09-410_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-06-09-410_哔哩哔哩.png)

##### 3.2 align-self

当你想为某一个item设置特殊的对齐方式，可以使用此属性覆盖container中的属性

![Screenshot_2020-02-20-21-08-46-872_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-08-46-872_哔哩哔哩.png)

##### 3.3 flex-grow(成长)

 注意：flex=1和flex-grow=1并不相同

​            当为小数时，会按比例占据生于的空间，因此剩余空间可能有剩余

![Screenshot_2020-02-20-21-20-41-342_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-20-41-342_哔哩哔哩.png)

##### 3.4 flex-shrink(收缩)

![Screenshot_2020-02-20-21-36-16-004_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-36-16-004_哔哩哔哩.png)

##### 3.5 flex-basis

![Screenshot_2020-02-20-21-33-24-091_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-33-24-091_哔哩哔哩.png)

##### 3.6 flex

 flex是flex-grow，flex-shrink，flex-basis三个属性的缩写

![Screenshot_2020-02-20-21-41-37-452_哔哩哔哩](F:\note\Log\images\Screenshot_2020-02-20-21-41-37-452_哔哩哔哩.png)