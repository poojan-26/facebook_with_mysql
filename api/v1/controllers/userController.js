const userHelper = require('../helper/userHelper')
const userValidator = require('../validators/userValidator')
const responseHelper = require('../../utils/responseHelper')
const codeHelper = require('../../utils/codeHelper')
const bcrypt = require('bcrypt');
const saltRounds = 10;//
const DB= require('./../../utils/db')

class userController {

 async getuser(req, res){
        try{
            let users = await userHelper.getuser(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }




    async getUserPage(req,res){
        try{
            let {page, size} =req.query;
            if (!page){
                page =1;
            }
            if (!size){
                size =1;
            }
            const limit = parseInt(size);
            const skip = (page - 1) * size;
            // let users = await userHelper.getuser(req.body)
            let user = await DB.select ('user', '*')
            let us = await DB.select (`user LIMIT ${limit} OFFSET ${skip}`, '*')
            responseHelper.success(res, 'GET_SIGNUPUSER_SUCCESS', req.headers.language, { total: user.length, page_no: page, size:us.length, users:us  })
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }
   

    async Deleteuser(req, res){
        try{
            let id = req.params.id;
            let users = await userHelper.Deleteuser(req.body,id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

        async updateUser(req, res){
            try{
                let id = req.params.id;
                await userValidator.getAlluserDataValidator(req.body);
                let users = await userHelper.updateUser(req.body,id)
                
                responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, users)
            }catch (error) {
                console.log(error)
                responseHelper.error(res, error, req.headers.language)
            }
        }   
        
        async signup(req, res) {
            try {            
                console.log("SignUp Req ::: ",req.body);
                await userValidator.validateSignupForm(req.body)
                await bcrypt.hash(req.body.Password, saltRounds, (err, hash)=>{
                    req.body.Password = hash;
                    const table = 'user'
                   DB.insert(table, req.body)
                })
                responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, {Username: req.body.Username })
            }catch(error){
                console.log(error)
                responseHelper.error(res,error,req.headers.language);
                // res.send(error)
            }
        }

        async signin(req,res){
            try{
                await userValidator.validateSigninForm(req.body)
                let token,
                    user = await userValidator.isUserWithEmailExist(req.body, false)
                await userValidator.validatePassword(user.Password, req.body.Password)
                if (user) {
                    token = await codeHelper.getJwtToken(user.Firstname)
                } 
                // responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, user, { auth_token: token })
                responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, {Username: user.Username, auth_token: token })
            } catch (error) {
                console.log(error)
                responseHelper.error(res, error, req.headers.language)
            }
        }
     

    async changePassword(req, res)
    {
       try {
        // let id = req.params.id;
           await userValidator.validateChnagePasswordForm(req.body)
           let user = await userHelper.getuserProfile(req.body.id)
           await userValidator.validateOldPassword(user.Password, req.body.old_Password)
           await userHelper.changePassword(req.body)
           responseHelper.success(res, 'CHANGE_PASSWORD_SUCCESS', req.headers.language,user)
       } catch (error) {
           console.log(error)
           responseHelper.error(res, error, req.headers.language, {})
       }
   }




}       
module.exports = new userController()