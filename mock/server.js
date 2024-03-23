import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json') // Assumes you have db.json in your project root

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// 在json-server的响应中添加自定义逻辑
server.use((req, res, next) => {
  router.render = (req, res) => {
    res.jsonp({
      code: 200,
      message: '请求成功',
      data: res.locals.data
    })
  }
  next()
})

// User login
server.post('/login', (req, res) => {
  const { username, password } = req.body
  // 用于简单的演示，没有真正的用户认证
  let token
  if (username === 'admin' && password === '123456') {
    token = 'sampleToken'
    res.jsonp({
      code: 200,
      message: '登录成功',
      data: {
        token: token
      }
    })
  } else {
    res.jsonp({
      code: 500,
      message: '用户名或密码错误'
    })
  }
})

// GetUser info
server.get('/getUserInfo', (req, res) => {
  // 用于简单的演示，没有真正的用户信息获取
  res.jsonp({
    code: 200,
    message: '获取用户信息成功',
    data: {
      username: 'sampleUser',
      email: 'sampleUser@example.com'
    }
  })
})

// GetPermission list
server.get('/getPermissionList', (req, res) => {
  // 用于简单的演示，没有真正的权限列表获取
  res.jsonp({
    code: 200,
    message: '获取权限列表成功',
    data: ['read', 'write', 'admin']
  })
})

server.use(router)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
