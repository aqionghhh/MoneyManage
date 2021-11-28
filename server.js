const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()//实例化app

//引入users.js
const users = require("./routes/api/users")

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DB config
const db = require("./config/keys").mongoURI
//连接数据库
mongoose.connect(db)
  .then(() => { console.log('数据库连接成功'); })
  .catch(() => { console.log(err); })

app.get('/', (req, res) => {
  res.send("hello world")
})



//使用routes
app.use('/api/users', users)


const port = process.env.PORT || 5000;//指定端口号
app.listen(port, () => {
  console.log(`服务器搭建完成${port}`);
})