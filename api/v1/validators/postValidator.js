const promise = require('bluebird')
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

class userValidator {
    async validateAddPostForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                caption: joi.string().required(),
                // image: joi.any().required(),
                likes: joi.number().integer().required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    
    async validateUpdatePostForm(body) {
        try {
            let schema = joi.object().keys({
                user_id : joi.number().integer().required(),
                caption : joi.string().required(),
                // image: joi.required(),
                likes : joi.number().integer().required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    // async isPostExist(body, throw_error_for_exists) {
    //     try {
    //         let selectParams = '*',
    //             where = `Email='${body.Email}'`,
    //             user = await db.select('user', selectParams, where)
    //         if (throw_error_for_exists) {
    //             if (user.length > 0) {
    //                 throw 'USER_WITH_EMAIL_ALREADY_EXISTS'
    //             } else {
    //                 return true
    //             }
    //         } 
    //             if (user.length > 0) {
    //                     return user[0]
    //             } else {
    //                 throw 'USER_WITH_EMAIL_NOT_FOUND'
    //             }
            
    //     } catch (error) {
    //         return promise.reject(error)
    //     }
    // }

    
    
    
    async updateAllpostDataValidator(body) {
            try {
                let schema = joi.object().keys({
                    user_id: joi.required(),
                    caption: joi.string().required(),
                    // image: joi.required(),
                    likes: joi.required()
                      })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }

        async validateChnagePasswordForm(body) {
            try {
                let schema = joi.object().keys({
                    old_password: joi.string().required(),
                    new_password: joi.string().required(),
                  //  user_id: joi.required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }  

        async validateOldPassword(db_password, body_password) {
            try {
                if (db_password != body_password) {
                    throw 'INCORRECT_OLD_PASSWORD'
                }
                return true
            } catch (error) {
                return promise.reject(error)
            }
        }


        async validateSigninForm(body) {
            try {
                let schema = joi.object().keys({
                    country_code: joi.string().required(),
                    phone_number: joi.string().required(),
                    password: joi.string().required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }
       
       /* async deleteAlluserDataValidator(body) {
            try {
                let schema = joi.object().keys({
                   
                first_name: joi.string().optional(),
                last_name:joi.string().optional(),
                gender: joi.string().optional(),
                email: joi.string().required(),
                password: joi.string().required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }
    
    */
    

    }
    module.exports = new userValidator()














    





