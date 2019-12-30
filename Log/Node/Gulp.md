### Gulp中提供的方法

+ gulp.src() : 获取任务要处理的文件
+ gulp.dest() : 输出文件
+ gulp.task() : 建立gulp任务
+ gulp.watch() : 监控文件的变化

```shell
//引入gulp模块
const gulp = require('gulp');
//建立gulp任务 first:任务名字
gulp.task('first',() => {
	//读取文件地址
	gulp.src('./src/css/base.css')
	//文件输出地址
	.pipe(gulp.dest('./dist/css'))
})
//一次执行多个gulp任务，[]中放入要执行的多个gulp名称
gulp.task('build',[]) 
```

### Gulp常用插件

+ gulp-htmlmin : html文件压缩
+ gulp-csso ：压缩css
+ gulp-babel ：JavaScript语法转化
+ gulp-less : less语法转化
+ gulp-uglify 压缩混淆JavaScript
+ gulp-file-include 公共文件夹包含
+ browsersync 浏览器实时同步