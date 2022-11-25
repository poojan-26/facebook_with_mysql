const promise = require('bluebird')
const { request } = require('express')
const dateHelper = require('../../utils/dateHelper')
const db = require('../../utils/db')

class userHelper {
    async getpost(body){
        try{
            let selectParams = '*'
            let table = 'post'
            let post  = await db.select(table, selectParams)
            return post
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async insertPost(body,file) {
        try {
            let data =  {
                user_id : body.user_id,
                caption : body.caption,
                image : file.path,
                likes : body.likes
            }
           const table = 'post'
           let post = await db.insert(table, data)
           return data
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async Deletepost(body,id){
        try{
          const table = 'post'
          const condition = `id = ${id}`
          const user = await db.delete(table, condition)
          return user
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async UpdatePost(body,id,file) {
        try {
            let data =  {
                user_id : body.user_id,
                caption : body.caption,
                image : file.path,
                likes : body.likes
            }
            const table = 'post'
            const condition = `id = ${id}`
            const user = await db.update(table, condition, data)
            return data
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }





}
module.exports = new userHelper()


























