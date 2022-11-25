const promise = require('bluebird')
const { request } = require('express')
const dateHelper = require('../../utils/dateHelper')
const db = require('../../utils/db')

class userHelper {
    async getfriendRequest(body){
        try{
            let selectParams = '*'
            let table = 'friend_request'
            let friend  = await db.select(table, selectParams)
            return friend
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async insertfriend(body) {
        try {
            let data =  {
                sender  : body.sender,
                receiver : body.receiver,
                status : body.status,
                account : body.account
            }
           const table = 'friend_request'
           let friend = await db.insert(table, data)
           return body
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async updateFriendrequest(body, id){
        try{
            let data =  {
                sender  : body.sender,
                receiver : body.receiver,
                status : body.status,
                account : body.account
            }
            const table = 'friend_request'
            const condition = `id = ${id}`
            const user = await db.update(table, condition, data)
            return data
    }catch (err){
            console.log(`there was an error ${err}`) 
            }
}

    async DeleteFriendrequiest(body,id){
        try{
            const table = 'friend_request'
            const condition = `id = ${id}`
            const user = await db.delete(table, condition)
            return user
    }catch{

    }
}


}
module.exports = new userHelper()