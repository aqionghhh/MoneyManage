//登录和注册功能
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

//引入User.js
const User = require("../../models/User")

//$route  GET请求 请求路径：api/users/test
//@desc  返回请求的json数据
//@access  public(接口分公共的还是私有的，这里是公共的接口)
router.get('/test', (req, res) => {
  //返回一个json数据
  res.json({ msg: "登录成功" })
})

//$route  POST请求 请求路径：api/users/register
//@desc  返回请求的json数据
//@access  public(接口分公共的还是私有的，这里是公共的接口)
router.post("/register", (req, res) => {
  // console.log(req.body)

  //查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email })
    .then((user) => {//成功
      if (user) {//查询到信息，即用户已经注册
        return res.status(400).json({ email: "邮箱已被注册" })
      } else {//邮箱没被注册，即可以创建用户
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          // avatar,
          password: req.body.password
        })

        //对密码进行加密
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    })
})


module.exports = router