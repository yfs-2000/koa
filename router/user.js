const Router = require("@koa/router")
const {verifyToken} = require("../token")
const router = new Router()
router.get("/info",(ctx,next)=>{
   /* const decode=   verifyToken("")
    console.log(decode);*/
    console.log(ctx.state.user);
    ctx.body = {name:"杨汕发",age:18}
})
module.exports = router
