# 第一天

###### 文件配置

```
|----------config文件夹
	|----------keys.js连接数据库的url
	|----------passport.js
|----------server.js项目主入口文件
|----------routes路由文件夹(里面放要访问的接口地址)
	|----------api文件夹
		|----------users.js登录和注册接口
		|----------profiles.js创建信息和获取所有信息和获取单个信息接口和编辑信								息接口和删除信息接口
|----------models创建数据库模型
	|----------User.js用户信息的数据库模型
	|----------Profile.js数据信息的数据库模型
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
	1、npm install jsonwebtoken
	2、获取到req中的email和password，查看数据库中是否存在email，存在的话匹配password
	3、在user.js中引入jwt	
		const jwt = require('jsonwebtoken')
	4、在进行密码匹配里定义规则并使用
		jwt.sign("规则","加密名字","过期时间","箭头函数")
	5、在keys.js中设置secretOrKey项，然后在users.js文件中引用
	
	6、使用passport-jwt验证token
		1.npm install passport-jwt passport
		2.在server.js中引入passport并初始化
			const passport = require('passport')
			app.use(passport.initialize())
		3.创建passport.js，在里面编写规则
		4.在user.js中验证token
			router.get("/current", passport.authenticate("jwt", { 				session: false }), (req, res) => {
              // res.json(req.user)//验证成功token后返回用户所有信息
              res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
              })//验证成功token后返回用户指定的信息
            })
```

```
User.js
	创建数据库模型（规则）
```

# 第二天

###### token

```
为了获取数据的一个令牌，只有拿到令牌之后才能拿到想要请求的数据

在postman中设置Headers
	key:Authorization
	value:之前返回的token值
	
	如果规则中要用到token就必须这样设置，然后才可以在Body中发出请求，接收响应
```

###### 添加一个选择身份的字段

```
在User.js里多增加一个字段identity，来判断是管理员还是普通用户
在users.js里new User的时候增加identity，登录的时候多定制identity的规则，匹配token成功后也返回identity
```

###### 数据信息接口

```
创建数据模型 models/Profile.js，在server.js中引入并使用，编写对应的api接口
该文件中有三个接口，分别是：创建信息、获取所有信息、获取单个信息、编辑信息、删除信息

其中，获取单个信息需要前端发来id作为匹配依据
```

