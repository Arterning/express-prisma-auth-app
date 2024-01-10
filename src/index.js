const apiRouter = require('./routes/api')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const express = require('express')


const app = express()
app.use('/api', apiRouter)
app.use('/', postRouter)
app.use('/', userRouter)
app.use(express.json())
app.use(express.static('public'));


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
