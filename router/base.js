const Router = require("@koa/router")
const {getToken} = require("../token")
const axios = require("axios")
const router = new Router()
const AES = require("crypto-js/aes");
const utf8 = require("crypto-js/enc-utf8");
router.get("/get",async (ctx,next)=>{
    console.log("??");
 const res =   await axios.get("https://api-cloud.bitmart.com/spot/v1/ticker?symbol=LXF_USDT",)
    console.log(res);
    ctx.body = {name:"首页"}
})
router.get("/login",async  (ctx,next)=>{
    const token =  getToken()
    ctx.body = {token}
})
router.get("/images",async  (ctx,next)=>{
    const {id,num=1} = ctx.query
    const bytes  = AES.decrypt(id, '1234567890123456');
    const decryptedData = bytes.toString(utf8);
    const res =   await axios.get(`https://lux-std-img.oss-cn-hongkong.aliyuncs.com/g/${decryptedData}/${num}.jpg`,{
        responseType:"arraybuffer",
    })
    ctx.status = 200;
    ctx.type = 'image/jpeg';
    ctx.body = res.data;

    /*const token =  getToken()
    ctx.body = {token}*/
})
router.post("/register",(ctx,next)=>{
    const body =   ctx.request.body
    console.log(body);
    ctx.body = body
})
module.exports = router
