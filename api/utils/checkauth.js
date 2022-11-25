


const jwt = require('jsonwebtoken')
// const responseHelper = require('../../utils/responseHelper');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, 'secretkey');
        //below code use when we have to implement any apecific user to access api
        // if (verify.usertype == admin){
        //     next();
        // }else{
        //     return res.status(401).json({
        //         msg:"not admin"
        //     })
        // }
        next();
    } catch (error){
       return res.status(401).json({
           msg:'invalid token'
       })
        }



}