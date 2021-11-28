# 第一天

###### 文件配置

```
|----------config文件夹
	|----------keys.js连接数据库的url
|----------server.js项目主入口文件
|----------routes路由文件夹(里面放要访问的接口地址)
	|----------api文件夹
		|----------users.js登录和注册功能
|----------models创建数据库模型
	|----------User.js用户信息的数据库模型
```

```
users.js
	先引入express，然后实例化router
        const express = require('express')
        const router = express.Router()
       	router.get()//在这里面配置路由
    在server.js中引入路由
    	const users = require("./routes/api/users")
    使用中间件来使用routes
    	app.use('/api/users', users)
    	
写登录功能时因为是POST请求，所以要npm install body-parser
然后在server.js中引入body-parser
使用中间件
		app.use(bodyParser.urlencoded({extended:false}))
		app.use(bodyParser.json())
		
要从数据库中获取所有用户然后查询其邮箱是否重复，所以要引入User.js 
```

```
User.js
	创建数据库模型（规则）
```

