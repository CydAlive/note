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