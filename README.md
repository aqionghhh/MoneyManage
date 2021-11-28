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
       	router.get/post()//在这里面配置路由，看是get请求还是post请求
    在server.js中引入路由
    	const users = require("./routes/api/users")
    使用中间件来使用routes
    	app.use('/api/users', users)
    	
写注册功能时因为是POST请求，所以要npm install body-parser
然后在server.js中引入body-parser
使用中间件
		app.use(bodyParser.urlencoded({extended:false}))
		app.use(bodyParser.json())
		
要从数据库中获取所有用户然后查询其邮箱是否重复，所以要引入User.js 
npm install bcrypt 对密码进行加密

使用头像avatar用到第三方包 npm install gravatar
在new User之前创建avatar
	        const avatar = gravatar.url(req.body.email,{s:"200",r:'pg',d:'mm'})
//如果没有设置头像，系统会设置一个默认头像

登录功能：jwt: json web token
	npm install jsonwebtoken
	获取到req中的email和password，查看数据库中是否存在email，存在的话匹配password
	在user.js中引入jwt	
		const jwt = require('jsonwebtoken')
	在进行密码匹配里定义规则并使用
		jwt.sign("规则","加密名字","过期时间","箭头函数")
	在keys.js中设置secretOrKey项，然后在users.js文件中引用
	
	使用passport-jwt验证token
		npm install passport-jwt passport
	
```

```
User.js
	创建数据库模型（规则）
```

