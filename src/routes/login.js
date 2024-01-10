const express = require("express");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma')
const router = express.Router();
const SECRET_KEY = 'login2021'

router.post('/login', async (req, res) => {
    // 校验密码....(此处省略), 如果校验成功, 生成jwt
    const { email, pass } = req.body;
    const user = await prisma.user.findUnique({
        where: {
          email
        }
    })

    if (!user) {
        return res.send({
            status: 401,
            message: '用户不存在'
        })
    }

    const isCorrectPassword = await bcrypt.compare(
      pass,
      user.pass
    );

    if (!isCorrectPassword) {
        return res.send({
            status: 401,
            message: '密码错误'
        })
    }
    // 参数1: 生成到token中的信息
    // 参数2: 密钥
    // 参数3: token的有效时间: 60, "2 days", "10h", "7d"
    const token = jwt.sign(
      { user },
      SECRET_KEY,
      { expiresIn: '3h' }
    )
    console.log('🚀 → token', token)
    res.send({
      status: 200,
      message: 'login success!',
      token,
    })
})

router.get('/getInfo', (req, res) => {
  console.log("user is ", req.auth)
  res.send({
      status: 200,
      message: 'success',
      data: req.auth,
  })
})



module.exports = router