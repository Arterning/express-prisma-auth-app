const apiRouter = require('./routes/api')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const express = require('express')
const { loggingMiddleware, errorMiddleware } = require('./lib/middleware')
var { expressjwt: jwt } = require("express-jwt");
const SECRET_KEY = 'login2021'


/**
 * 对app的操作顺序很重要
 * 如果在路由注册之前注册中间件，那么中间件会先执行
 * 如果在路由注册之后注册中间件，那么中间件对之前的路由不生效
 */
const app = express()
app.use(loggingMiddleware, errorMiddleware)


app.use(
  jwt({
      secret: SECRET_KEY,
      algorithms: ['HS256'], // 使用何种加密算法解析
  }).unless({ path: ['/login', '/signup', '/'] }) // 登录页无需校验
)

app.use('/api', apiRouter)
app.use('/', postRouter)
app.use('/', userRouter)
app.use('/',loginRouter)
app.use('/', function(req, res) {
  res.send('Hello World Good Good!')
})
app.use(express.json())
app.use(express.static('public'));


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
