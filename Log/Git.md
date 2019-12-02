# 1.git ssh密钥创建和重置

1. 打开git bash
2. git config --global user.name “账户名”
3. git config --global user.email ”邮箱“
4. ssh-keygen -t rsa -C "邮箱"
5. 打开id_rsa.pub查看是否为自己设置的邮箱，如果不是删掉，重复以上操作。

