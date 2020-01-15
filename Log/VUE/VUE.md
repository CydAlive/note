## Vue学习

### Vue生命周期

```shell
new Vue({
            el: '#app',
            data: {
                msg: 'dream'
            },
            methods: {
                show(){
                    console.log('show');
                }
            },
            beforeCreate () {
                //data和methods中的数据还没有初始化完成，不能使用
            },
            created () {
				//data和methods中的数据初始化完成，最早只能在这里调用
            },
            beforeMount () {
            	//页面在内存中渲染完毕，但并没有渲染到页面上
            },
            mounted () {
				//页面渲染完毕，初始化完毕，可以对页面的dom元素进行操作
            },
            beforeUpdate () {
				//model中的数据已经更新，但是页面并没有从新渲染
            },
            updated () {
				//页面重新渲染完毕
            },
            beforeDestroy () {
                //销毁之前，但是data、methods都还没有销毁
            },
            destroyed () {
                //vue实例被销毁
            }
        })
```

### Vue基础结构

```shell
new Vue({
			//用于挂在要管理的元素
            el: '#app',
            //定义数据
            data: {
                msg: 'dream'
            },
            //定义方法
            methods: {
                show() {
                    console.log('show');
                }
            },
            //计算属性 :和methods的区别在于，多次调用时，computed有缓存不需要重复执行
            computed: {
            	total() {
            		return this.a + this.b
            	}
            }，
            //对传入的数据进行处理 使用：{{num | filterNum}}
            filters: {
            	filterNum(num){
            		return num.toFixed(2)
            	}
            }，
            //创建组件 cpn:组件名，cont：通过组件构造器定义的模板
            components: {
            	cpn: cont
            }
            
        })
```

### Vue基础

#### 1.：key的作用

​	更高效的利用虚拟DOM，不建议使用index下标，因为插入数据时下标并不是一一对应的。

#### 2. v-model修饰符

##### lazy

`v-model.lazy`

双向绑定的数据不会实时同步，而是在离焦后同步

##### number

`v-model.number`

输入的数据转换为number类型

##### trim

`v-model.trim`

去除字符串两侧的空格

#### 3.组件中data必须是一个函数

是一个函数，同时return{数据}，才能重复的使用此组件；

data：{数据}，这种方法多次使用时，指向的会是同一个实例，无法复用；



### Vue组件化

#### 1. 组件的注册，父子组件嵌套

```vue
		//创建子组件构造器
		const spnt2 = Vue.extend({
            template:  `
                <div>
                    <p>子组件</p>
                </div>
            `
        });
		//父组件构造器  ！：在父组件中使用子组件时，子组件需要在前面构造完成，否则会报错
        const cpnt1 = Vue.extend({
            template: `
                <div>
                    父组件
                        <spnc2></spnc2>
                    父组件
                </div>
            `,
			//注册组件
            components: {
                spnc2: spnt2
            }
        });
		new Vue({
			el: "#app",
			data: {

			},
			methods: {
	
			},
			//注册组件（根组件）
			conponents: {
				cpnc1: cpnt1
			}
		})
```

```vue
Vue.component('cpn3',{
	template:`
		<div>
            语法糖注册全局组件
		</div>
	`
})
```

```vue
const ccc = new Vue({
            el: '#app',
            data: {
   
            }
            components: {
                cpnc1: {
                    template: `
                        <div>
                            语法糖注册局部组件
                        </div>
                    `
                }
            }
        })
```

#### 2. 组件模板的分离写法

```vue
//将组件需要用到的html模板抽离到script中，type类型为 text/x-template
<script type="text/x-template" id="tem1">
       <div>组件html抽离写法</div>
</script>
//使用id对组件进行注册
Vue.component('cpn3',{
	template: '#tem1'
})
```

#### 3. 组件如何访问Vue实例中的数据

​	组件不能直接访问vue实例data中的数据

##### 组件传值：父传子

```vue
<div id="app">
    	//data实例中arr使用v-bind绑定到datac上，在子组件props中接收
        <cpn1 :datac="arr"></cpn1>
    </div>
    <!-- <template id="tem1">
        <div>
            <div>组件html抽离写法muabn1</div>
            <h1>{{ datac }}</h1>
        </div>       
    </template> -->
    <script type="text/x-template" id="tem1">
        <div>
            <div>组件html抽离写法muabn1</div>
            <h1>{{ datac }}</h1>
        </div>     
    </script>
    <script>
        //创建模板子组件
        const cpn1 = {
            template: '#tem1',
            //第一种 ！props中命名如果使用驼峰命名使用会比较麻烦，需要用-隔开
            props: ['datac','bb','cc'],
            //第二种
            props: {
            	datac: String,
            	bb: Array，
                cc: Object
        	},
           	//第三种
            props： {
        		datac: {
            		//限制类型
            		type:String,
            		//没有传入参数时的默认值
            		default: 'aaaa',
            		//是否为必传项
            		required: true
        		},
              	cc: {
                    //限制类型
            		type: Object,
            		//没有传入参数时的默认值
            		default() {
                      return{
                          当类型为Object时，default写法
                      }  
                    },
            		//是否为必传项
            		required: true
                }
        	}
        }
        const ccc = new Vue({
            el: '#app',
            data: {
                arr: '橙子',
                arr2: []
            },
            //注册组件，不改变名字时，可以直接将子组件名字写入
            components: {
                cpn1
            },
        })
```

















## Vue开发

#### 1.开发前的配置

+ Vue脚手架的安装
  
+ npm install -g @vue/cli
  
+ 使用ui界面创建Vue项目
  
+ vue ui
  
    ```shell
    此命令需要vue为3.0以上版本（vue -V）查看版本号
    如不是可使用 npm uninstall -g vue-cli 或 yarn global remove vue-cli卸载旧版本
    使用 npm install -g @vue/cli 或 yarn global add @vue/cli 重新安装
    **[2019/12/11]**
  因为环境变量问题，导致vue2.9.6版本无法卸载，将npm环境变量改为正确的路径解决
  ```
  

#### 2.element ui 使用时遇到的问题

1. form 表单组件中 prop验证规则需要和v-model绑定的名字一致

![Snipaste_2019-12-15_18-00-05](F:\note\Log\VUE\images\Snipaste_2019-12-15_18-00-05.png)