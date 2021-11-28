//登录和注册功能
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const keys = require('../../config/keys')

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
        //如果没有设置头像，系统会设置一个默认头像
        const avatar = gravatar.url(req.body.email, { s: "200", r: 'pg', d: 'mm' })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
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



//$route  POST请求 请求路径：api/users/login
//@desc  返回token jwt passwort
//@access  public(接口分公共的还是私有的，这里是公共的接口)
router.post("/login", (req, res) => {
  //获取email和password
  const email = req.body.email;
  const password = req.body.password;

  //查看数据库中是否存在email，存在的话匹配password
  User.findOne({ email })
    .then(user => {
      if (!user) {//用户不存在的话
        return res.status(404).json({ email: '用户不存在！' })
      } else {
        //进行密码匹配
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {//密码匹配成功
              const rule = { id: user.id, name: user.name };//定义一个规则

              // jwt.sign("规则","加密名字","过期时间","箭头函数")
              jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                  success: true,//代表已经得到了token
                  token: "sxq" + token,
                })
              })
              // res.json({ msg: "success" })
            } else {//密码匹配失败
              return res.status(400).json({ password: "密码错误！" })
            }
          })
      }

    })
})

//$route  GET请求 请求路径：api/users/current
//@desc  return 当前用户信息
//@access  Private(接口分公共的还是私有的，只有拥有这个私人令牌的时候才能得到用户信息)
// router.get("/current","验证token",(req,res)=>{})
router.get("/current", (req, res) => {
  res.json({ msg: "success" })
})

module.exports = router