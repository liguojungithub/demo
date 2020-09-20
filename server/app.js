const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, '/public')))
app.use(views(path.resolve(__dirname, '/views'), { extension: 'pug' }))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
const index = require('./routes/index')
const user = require('./routes/user')
const category = require('./routes/category')
const cart = require('./routes/cart')
const detail = require('./routes/detail')
const product = require('./routes/product')
const search = require('./routes/search')

app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(cart.routes(), cart.allowedMethods())
app.use(detail.routes(), detail.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(search.routes(), search.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
