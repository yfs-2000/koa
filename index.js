const Koa = require("koa");
const mongoose  = require("mongoose")
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const baseRouter = require('./router/base')
const userRouter = require('./router/user')
const Router = require("@koa/router")
const  jwt = require('koa-jwt');

const router = new Router()
const app = new Koa()

app.use(require('koa-static')("./public")); //暴露静态资源文件
/*//时间
app.use(async function (ctx,next){
    const start = new Date()
    await  next()
    /!*console.log(new Date() - start)*!/
})*/
//错误
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
}); //处理没有token的
app.use(jwt({ secret: 'shared-secret' }).unless({ path: [/^\/login/,/^\/get/,/^\/images/, /^\/register/ ,/^\/$/ ] })); //unless为哪些可以摸鱼token
//secret是秘钥

app.use(cors());//跨域
app.use(koaBody({multipart:true}))//解析post请求中的body参数
router.use(baseRouter.routes()) //路由1加载
router.use("/user",userRouter.routes())//路由2加载
app.use(router.routes()).use(router.allowedMethods())//加载所有的路由

mongoose.connect("mongodb://localhost:27017/users",{ useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
    console.log("成功启动")
    app.listen(3003)
}).catch((error)=>{
    console.log(error);
})


