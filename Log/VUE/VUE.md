### VUE生命周期

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

### VUE基础结构

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
            }	
        })
```



### 1.开发前的配置

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
  

### 2.element ui 使用时遇到的问题

1. form 表单组件中 prop验证规则需要和v-model绑定的名字一致

![Snipaste_2019-12-15_18-00-05](F:\note\Log\VUE\images\Snipaste_2019-12-15_18-00-05.png)