## Vue学习

### 一、Vue生命周期

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

### 二、Vue基础结构

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

### 三、Vue基础

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

#### 4. native修饰符

`<go-top @click.native="gotop">返回顶部</go-top>`

native修饰符可以直接监听组件身上的事件



#### 3.组件中data必须是一个函数

是一个函数，同时return{数据}，才能重复的使用此组件；

data：{数据}，这种方法多次使用时，指向的会是同一个实例，无法复用；



### 四、Vue组件化

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

##### 组件传值：子传父

![1582185879717](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1582185879717.png)

#### 4.组件访问

##### $children父访问子组件

`console.log(this.$children[0].name);`

##### $refs父访问子组件

首先要设置子组件ref `<cpn ref='aaa'>aaa</cpn>`

之后使用 `console.log(this.$refs.aaa.name);`

就可以获取到子组件中的name属性

##### $parent子访问父

`this.$parent.name` 可以获取到父组件中name属性

##### $root 访问根组件(vue实例)

`this.$root.name`  可以访问到根组件(vue实例)中的name属性

#### 5. solt 插槽的使用

##### 基础使用

在组件中使用`<slot></slot>`定义插槽

同时插槽中还可以设置默认值`<slot>defualt</solt>`

使用时如果没有定义插槽中的内容，则会显示提前设置好的默认值

##### 具名插槽

```vue
<div id="app">
    <cpn>
        //使用时通过slot来决定替换掉那个插槽
        <span slot="left">my</span>
        <span slot="right">alive</span>
    </cpn>
</div>
<template id="cpn">
	<div>
        //在模板中给插槽命名
        <slot name='left'>左边</slot>
        <slot name='concet'>中间</slot>
        <slot name='right'>右边</slot>
    </div>    
</template>
```

##### 作用域插槽

```vue
<div id="app">      
    <cpn>
        //通过 slot-scope接受传输过来的数据，然后进行自定义操作
        <template slot-scope='list'>
            <span>{{ list.data }}</span>
            <span v-for='item in list.data'>{{ item }}</span>
        </template>
    </cpn>
</div>
<template id="cpn">
<div>
    //通过自定义的`:data`将list数据传出，在外部就可以使用了
    <slot :data='list'>
        <ul>
            <li v-for='item in list'>{{ item }}</li>
    	</ul>    
    </slot>
    </div>    
</template>
```

### 五、Vue路由

#### 1. history函数

`history.pushState({},'','/home')` 路由跳转，会保存路由地址进栈

`history.replaceState({},'','/home')` 路由跳转，不会保存历史路由

`history.back()`等价于`history.go(-1)` 根据路由历史后退一次

`history.forward()` 等价于`history.go(1)` 根据路由历史前进一次



 #### 2. router-link

<router-link>：该标签是一个vue-router中已经内置的组件，它会被渲染成一个，<a>标签。

```vue
<router-link to='/home' tag='buttom' active-class='style' replace></router-link>
```

to : 将要跳转到的路由地址

tag : 渲染之后标签的类型

active-class：选中当前时，样式会自动为其添加style样式

replace： 不会留下history历史，后退键不能返回到上一个界面

第二种方法进行路由跳转：使用事件绑定的方法，借助$router进行路由跳转

![1580978003182](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1580978003182.png)

#### 3. router-view

<router-view>：该标签会根据当前的路径，动态渲染出不同的组件。起到占位作用。

#### 4.  改变HTML5的history模式

浏览器路径中出现 **#** 符号可以通过这种方式去除

![1580976645262](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1580976645262.png)

#### 5. 动态路由

![1580994277934](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1580994277934.png)

#### 6. 路由的懒加载

使用路由懒加载后的效果

![1580994358743](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1580994358743.png)

 ES6中路由懒加载的使用方式

```javascript
文件引入由
import Home from '../home.vue'
变为
const Home = () => import('../home.vue')
```

#### 7. 路由嵌套

path：请求路径

redirect : 重定向

component ： 该路径对应的地址

children： 子路由

<img src="C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1580995462061.png" alt="1580995462061"  />

#### 8. $router常见导航方式

```javascript
Vue-Router中常见的导航方式：
this.$router.push("hash地址");
this.$router.push("/login");

//使用{{ $route.parmas.id }}接收
this.$router.push({ name:'user' , params: {id:123} });

this.$router.push({ path:"/login" });

//使用{{ $route.query.username }}接收
this.$router.push({ path:"/login",query:{username:"jack"} });

this.$router.go( n );//n为数字，参考history.go
this.$router.go( -1 );
```

#### 9. 导航守卫

[路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB) Vue Router

![1581045071822](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581045071822.png)

导航钩子的三个参数解析:

to : 即将要进入的目标的路由对象.

from : 当前导航即将要离开的路由对象.

next : 调用该方法后, 才能进入下一个钩子.

#### 10. keep-alive

exclude :  被排除的组件，不会对其进行缓存，依旧离开时会销毁进入时会创建

![1581047725174](C:\Users\懂丶\AppData\Roaming\Typora\typora-user-images\1581047725174.png)





## VueX

Vuex是一个专门为vue.js应用程序开发的状态管理模式，

1. 它采用 **集中式存储管理** 应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。
2. Vuex 也集成到 Vue 的官方调试工具 [devtools](https://github.com/vuejs/vue-devtools)[ extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

#### Vuex基础结构

```javascript
export default new Vuex.Store({
  //vue各组件公共的数据
  state: {
	//调用方法：使用<h1>{{ $store.state.num }}</h1> 调用
	num: 1
  },
  //对state中的数据修改建议通过这里
  mutations: {
	//可以传入一个形参，该形参可以获取到state中的所有数据
	//调用方法：在vue实例的方法中通过 this.$store.commit('fly') 调用
	fly(state) {
		state.num++
	},
	//可以传入两个参数，第二个参数在commit中动态传入
	//调用方法：this.$store.commit('fly2', 5)
	fly2(state, n) {
		state.num += n
	}
  },
  actions: {
	
  },
  //类似vue实例中的计算属性
  getters: {
	//只传一个形参会把state传递进去
	//调用方法： <h1>{{ $store.getters.top }}</h1>
	top(state) {
		return state.num * 2
	},
	//传递两个形参会把gerters也传递进去，同时可以调用getters中的函数
	//调用方法： <h1>{{ $store.getters.computed }}</h1>
	computed(state, getters) {
		return getters.top - 2
	},
	//如果想要自定义传入的值，可以使用return一个方法的方式，调用时多加一个（）
	//调用方法：<h1>{{ $store,getters.self(5) }}</h1> 输出：10
	self(state) {
		return function(age) {
			return age * 2
		}
	}
  },
  modules: {
  }
})
```

##### state

**vue各组件公共的数据**

```javascript
  state: {
	//调用方法：使用<h1>{{ $store.state.num }}</h1> 调用
	num: 1
  }
```

##### actions

**异步操作要在actions中，而不是在mutation中**

```javascript
//store index.js
mutations: {
    //第一个参数将state传递进来，第二个为调用者传入的数据
    asyncUpdate(state, data) {
      console.log(data);
    }
},
actions: {
    //注意此处传入的第一个参数为store,第二个为调用者传递的数据(数据可以为对象)
    updateInfo(store, data) {
      //此函数返回一个Promise对象
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //使用传入的store直接.commit来调用mutations中的函数，第二个参数为传入的数据
          store.commit('asyncUpdate','hello!')
          resolve()
        }, 2000);       
      })
   } 
}
//vue 实例中
methods: {
    async() {
      //使用时通过dispatch调用，因为返回的是一个Promise对象，可以直接使用.then链式编程
      this.$store.dispatch('updateInfo', '再此可以传递message，可以为对象')
        .then(res => {
          console.log('word！');
      })
   }
}
```

##### mutations

**对state中的数据修改建议通过这里**

```js
mutations: {
	//可以传入一个形参，该形参可以获取到state中的所有数据
	//调用方法：在vue实例的方法中通过 this.$store.commit('fly') 调用
	fly(state) {
		state.num++
	},
	//可以传入两个参数，第二个参数在commit中动态传入
	//调用方法：this.$store.commit('fly2', 5)
	fly2(state, n) {
		state.num += n
	}
  }
```

##### getters

**类似vue实例中的计算属性**

```javascript
  getters: {
	//只传一个形参会把state传递进去
	//调用方法： <h1>{{ $store.getters.top }}</h1>
	top(state) {
		return state.num * 2
	},
	//传递两个形参会把gerters也传递进去，同时可以调用getters中的函数
	//调用方法： <h1>{{ $store.getters.computed }}</h1>
	computed(state, getters) {
		return getters.top - 2
	},
	//如果想要自定义传入的值，可以使用return一个方法的方式，调用时多加一个（）
	//调用方法：<h1>{{ $store,getters.self(5) }}</h1> 输出：10
	self(state) {
		return function(age) {
			return age * 2
		}
	}
  }
```

##### modules

因为vuex中只能有一个store,但是可以划分为多个modules

```javascript
const modulesA = {
    //调用方法：<h1>{{ $store.state.a.num }}<h1>
    state: {
        num: 1
    },
    //调用方法：在vue实例的方法中通过 this.$store.commit('fly') 调用
    mutations: {
        fly(state) {
			state.num++
		}
    },
    //调用方法： <h1>{{ $store.getters.top }}</h1>
    getters: {
        top(state) {
			return state.num * 2
		}
    },
    //模块中的actions可以传递第三个参数，通过它可以调用根中mutations使用
    actions: {
        UpdataInfo(store, data, rootMutations) {
            
        }
    },
    //不建议继续使用modules进行嵌套，代码会变的繁琐
    modules: {}
},
const modulesA = {
    ....
}

modules: {
    a: modulesA,
    a: modulesB
}
```

#### Vuex基本使用

```vue
export default new Vuex.Store({
  state: {
    name: 1
  },
  mutations: {
    top(state) {
      state.name++
    },
    buttom(state) {
      state.name--
    }
  },
  actions: {
  },
  modules: {
  }
})

//vue文件中对vuex的使用
//同过main文件中的store可以直接调用state中的值
<h1>{{$store.state.name}}</h1>
//对state中的值做修改时建议通过mutations（改变）

methods: {
    big() {
	  //通过$store.conmit可以直接调用store文件mutations中定义的函数
      this.$store.commit('top')
    },
    small() {
      this.$store.commit('buttom')
    }
  }
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

## Vue开发2.0

#### 配置路径缩写

在**vue.config.js**文件中进行配置，

框架内部已经使用 @ 代表 src文件夹，例如assets就代表src文件夹下的assets目录

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
//之后引入文件可直接使用如下方式缩写
import Scroll from "components/common/scroll/Scroll";
//在src中使用时，前边需要加 ~ 号
<img src="~assets/img/home/recommend_bg.jpg" alt="">
```

#### vue图片懒加载

使用Vue-Lazyload

#### px2vw-css单位转化

使用 postcss-px-to-viewport

#### 解决移动端延时300ms问题

使用 fastclick

#### nginx-window环境部署



#### nginx-Linux环境部署

