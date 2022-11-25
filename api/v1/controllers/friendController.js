const friendrequestHelper = require('../helper/friendrequestHelper')
const friendrequestValidator = require('../validators/friendrequestValidator')
const responseHelper = require('../../utils/responseHelper')
const codeHelper = require('../../utils/codeHelper')
const bcrypt = require('bcrypt');
const saltRounds = 10;//
const DB= require('./../../utils/db')

class userController {
    async getFriendRequest(req,res){
        try{
            let friend = await friendrequestHelper.getfriendRequest(req.body)
            responseHelper.success(res, 'GET_SIGNUPUSER_SUCCESS', req.headers.language, friend)
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }

    async getFriendPage(req,res){
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
            let user = await DB.select ('friend_request', '*')
            let us = await DB.select (`friend_request LIMIT ${limit} OFFSET ${skip}`, '*')
            responseHelper.success(res, 'GET_SIGNUPUSER_SUCCESS', req.headers.language, { total: user.length, page_no: page, size:us.length, users:us  })
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }
   

    async createFriendRequest(req, res) {
        try {
            console.log("===========", req.body)
            await friendrequestValidator.validateAddfriendrequestForm(req.body)
            let post = await friendrequestHelper.insertfriend(req.body,req.file)
            responseHelper.success(res, 'ADD_POST_SUCCESS', req.headers.language,post)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async updateFriendrequest(req, res){
        try{
            let id = req.params.id;
            await friendrequestValidator.updateAllFriendDataValidator(req.body);
            let users = await friendrequestHelper.updateFriendrequest(req.body,id)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async DeleteFriend(req, res){
        try{
            let id = req.params.id;
            let users = await friendrequestHelper.DeleteFriendrequiest(req.body,id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
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
        let id = req.params.id;
           await userValidator.validateChnagePasswordForm(req.body)
           let user = await userHelper.getuserProfile(req.body.id)
           await userValidator.validateOldPassword(user[0].password, req.body.old_password)
           await userHelper.changePassword(req.body)
           responseHelper.success(res, 'CHANGE_PASSWORD_SUCCESS', req.headers.language,user)
       } catch (error) {
           console.log(error)
           responseHelper.error(res, error, req.headers.language, {})
       }
   }





}       
module.exports = new userController()
