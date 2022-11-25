const promise = require('bluebird')
const { request } = require('express')
const dateHelper = require('../../utils/dateHelper')
const db = require('../../utils/db')

class userHelper {
    async getuser(body){
        try{
            let selectParams = '*'
            let table = 'user'
            let user  = await db.select(table, selectParams)
            return user
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async Deleteuser(body,id){
        try{
          const table = 'user'
          const condition = `id = ${id}`
          const user = await db.delete(table, condition)
          return user
          // let sql = `DELETE FROM user WHERE User_id = ${id}`;
          // console.log(sql)
          // let user = await db.query(sql, [body])
          // if (user.length<1){
          //     throw 'USER_NOT_FOUND'
          // }else{
          //     return user[0];
          // }
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async updateUser(body, id){
        try{
            const table = 'user'
            const condition = `id = ${id}`
            const user = await db.update(table, condition, body)
            return body
            // const user = {
            //     Firstname: body.Firstname,
            //     Lastname: body.Lastname,
            //     Username: body.Username,
            //     Birthdate: body.Birthdate,
            //     City: body.City,
            //     Gender: body.Gender,
            //     Phone: body.Phone,
            //     Email: body.Email,
            //     Password: body.Password
            //     }
            // let sql = `UPDATE user SET ? WHERE User_id = ${id}`;
            // console.log(sql)
            // let user = await db.query(sql, [body])
            // if (user.length<1){
            //     throw 'USER_NOT_FOUND'
            // }else{
            //     return user[0];
            // }
    }catch (err){
            console.log(`there was an error ${err}`) 
            }
}


async insertAlluserData(body) {
    try {
        var data = {
            first_name: joi.string().optional(),
            last_name:joi.string().optional(),
            gender: joi.number().precision(3).optional(),
            email: joi.string().required(),
            password: joi.string().required()
        }
        let result = await db.insert('facebook', data)
        var resultData = { "user_id": result }
        return resultData

    } catch (error) {
        throw error
    }
}

async updateAlluserData(body, id){
    try{
        const table = 'user'
        const condition = `User_id = ${id}`
        const user = await db.update(table, condition, body)
        return body
   }catch (err){
        console.log(`there was an error ${err}`) 
        }
}

async deleteAlluserData(body, id){
    try{
        const table = 'user'
        const condition = `User_id = ${id}`
        const user = await db.delete(table, condition)
        return user
   }catch (err){
        console.log(`there was an error ${err}`) 
        }
}


// async getuserProfile(id) {
//     try {
//         let where = `id = ${id}`,
//             selectParams = '*',
//             table = 'user'
//             user = await db.select(table, selectParams, where)
//         return user
//     } catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }

async getuserProfile(id) {
    try {
    let where = `id = ${id}`,
            selectParams = '*',
            user = await db.select('user', selectParams, where)
        return user
    } catch (err){
        console.log(`there was an error ${err}`) 
        }
}

// async changePassword(body,id) {
//     try {
//         let data = {
//             Password: body.new_password,
//             // modified_date: dateHelper.getCurrentTimeStamp()
//         }
//             where = `id=${id}`
//             table = 'user'
//         let result= await db.update(table, where, data)
//         console.log("change password", result)
//         return true
//     } catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }


async changePassword(body) {
    try {
        let data = {
            Password: body.new_password,
            //modified_date: dateHelper.getFormattedDate()
        },
            where = `id=${body.id}`
        let result= await db.update('user', where, data)
        console.log('change password' , result)
        return true
    } catch (error) {
        console.log(error)
        return promise.reject(error)
    }

}

/*async updateAlluserData(body) {
    try {
        var data = {
            first_name: joi.string().optional(),
            last_name:joi.string().optional(),
            gender: joi.number().precision(3).optional(),
            email: joi.string().required(),
            password: joi.string().required()
        }
        let result = await db.update('facebook', data)
     var resultData = { "user_id": result }
        return resultData

    } catch (error) {
        throw error
    }
}*/



/*async updateAlluserData(body) {
        try {
            //let condition = `user_id = ${body.user_id}`,
                data = {
           
                    created_date: dateHelper.getFormattedDate(),
                    modified_date: dateHelper.getFormattedDate()
                }
            let result = await db.update('facebook', condition, data)
            return result
        } catch (error) {
            throw(error)
        }
    }*/

    
    
   /* async deleteAlluserData(body) {
            try {
                let where = ` user_id = ${body.book_id} `;
                let data = await db.delete('facebook', where)
                console.log('delete success'.data);
                return data
            } catch (error) {
                throw error
            }
        }
        */

}
module.exports = new userHelper()


























