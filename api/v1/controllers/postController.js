const postHelper = require('../helper/postHelper')
const postValidator = require('../validators/postValidator')
const responseHelper = require('../../utils/responseHelper')
const bcrypt = require('bcrypt');
const saltRounds = 10;//
const DB= require('./../../utils/db')

class userController {
    async getpost(req,res){
        try{
            let signup = await postHelper.getpost(req.body)
            responseHelper.success(res, 'GET_POST_SUCCESS', req.headers.language, signup)
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }

    async getPostPage(req,res){
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
            let user = await DB.select ('post', '*')
            let us = await DB.select (`post LIMIT ${limit} OFFSET ${skip}`, '*')
            responseHelper.success(res, 'GET_POST_SUCCESS', req.headers.language, { total: user.length, page_no: page, size:us.length, users:us  })
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }

   
    async createPost(req, res) {
        try {
            console.log("===========", req.body)
            // req.body.user_id = req.user_id
            // const image = req.file.path
            await postValidator.validateAddPostForm(req.body)
            // await postValidator.isVehicleExist(req.body, true)
            // if (req.file) {
            //     req.body.vehicle_image = await S3helper.uploadImageOnS3("tekoto/vehicles/", req.file)
            // }
            let post = await postHelper.insertPost(req.body,req.file)
            responseHelper.success(res, 'ADD_POST_SUCCESS', req.headers.language,post)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async Deletepost(req, res){
        try{
            let id = req.params.id;
            let post = await postHelper.Deletepost(req.body,id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, post)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async UpdatePost(req, res){
        try{
            let id = req.params.id;
            // let user_id = req.body.user_id;
            await postValidator.validateUpdatePostForm(req.body);
            let post = await postHelper.UpdatePost(req.body,id,req.file)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, post)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }







}       
module.exports = new userController()
