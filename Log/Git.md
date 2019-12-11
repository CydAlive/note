# Git常用命令

```shell
git config --global user.email “邮箱名”：绑定GitHub邮箱
git config --global user.name “Github名”：绑定GitHub
git init：初始化一个空的git仓库
git status：检查仓库中的文件状态
git add：添加文件到暂存区
git commit -m “备注信息”：提交到版本库并记录提交信息
git log：查看git日志
git log --pretty=oneline：简化日志信息
git log --graph --pretty=oneline --abbrev-commit 查看日志信息（暂时不知跟上面有什么区别）
git checkout – 文件名：撤销对本地文件的更改（未add时）
git reset HEAD 文件名：撤销对暂存区的修改（add后）（相当于撤销add操作）
git reset --hard HEAD^：回退版本信息
（HEAD^：一个版本 HEAD~50 五十个版本）
git reset --hard 标识符：恢复到标识符版本
git rm 文件名：删除仓库中的文件
git clone GitHub仓库地址：将远程的仓库下载到本地
git push origin master：将本地仓库的内容与远程仓库同步 推过去
git pull origin master：拉取远程仓库的代码到本地，使本地与远程仓库的代码同步 拉过来
git remote add origin 仓库地址：将本地仓库同步（连接）到远程仓库
git push -u origin master：将本地仓库的内容推送到远程仓库中
（-u参数，Git会把本地的master分支与远程的master分支关联起来）
git branch 分支名：创建新分支
git checkout 分支名：切换到分支
git checkout -b 分支名：创建并切换分支
git branch：查看分支
git branch -D(d高版本小写也可以) 分支名：删除分支
git push origin本地分支名:远程分支名：将分支推送到远程仓库
（如果没有冒号那么本地分支名将会与远程分支名相同）
```





# 1.git ssh密钥创建和重置

1. 打开git bash
2. git config --global user.name “账户名”
3. git config --global user.email ”邮箱“
4. ssh-keygen -t rsa -C "邮箱"
5. 打开id_rsa.pub查看是否为自己设置的邮箱，如果不是删掉，重复以上操作。

## ？问题

```shelll
创建仓库时没有取消  git push -u origin master  选项造成无法提交（2019/12/11）
```

