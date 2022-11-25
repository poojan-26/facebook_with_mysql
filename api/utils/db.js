//var mysql = require('mysql');
const promise =require("bluebird")
//const { resolve, reject } = require('bluebird');
var mysql = require('mysql');
let connection
class DB{
  async getConnection(){
    return new Promise((resolve,reject)=> {
     connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "facebook"
      });
      
      connection.connect(function(err) {
        if (err){
          console.error("error connecting" +err.stack);
          reject();
      
        } else{
          console.log('connected to ' + connection.config.database +' database');
          resolve()
        }
      });

    })
  }


  select(table, selectParams, condition) {
    return new promise((resolve, reject) => {
      let query = `SELECT ${selectParams} FROM ${table}`
      if (condition) {
        query += ` WHERE ${condition}`
      }
      console.log('\n\n', query, '\n\n')
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }

  // insert(table, params, data) {
  //   return new promise((resolve, reject) => {
  //     // let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(${Object.keys(data).map((d, index) => ('$' + (index + 1)))}) RETURNING *`,
  //     // let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(?,?,?,?,?,?,?,?,?) `,
  //       let query = (`INSERT INTO ${table} SET ?`, params);
  //       //  values = Object.values(data)
  //     console.log("query", query)
  //     connection.query(query, (error, results) => {
  //       console.log(query)
  //       if (error) {
  //         console.log(error)
  //         reject('DB_ERROR')
  //       } else {
  //         resolve(results)
  //       }
  //     })
  //   })
  // }

  // insert(table, data) {
  //   return new promise((resolve, reject) => {
  //     let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(${Object.keys(data).map((d, index) => ('$' + (index + 1)))}) RETURNING *`,
  //       values = Object.values(data)
  //     console.log("query", query)
  //     connection.query(query, values, (error, results) => {
  //       console.log(query)
  //       if (error) {
  //         console.log(error)
  //         reject('DB_ERROR')
  //       } else {
  //         resolve(results.rows[0])
  //       }
  //     })
  //   })
  // }
  
insert (table, body) {
  return new promise ((resolve, reject) => {
    console.log("Insert body");
    // console.log(body);
    let query = `INSERT INTO ${table} SET ? `
    console.log(query);
    connection.query(query, body, (error, results) => {
      if (error) {
        console.log(error)
        reject('DB_ERROR')
      } else {
        resolve(results)      
      }
    })
  })
}

delete(table, condition) {
  return new promise((resolve, reject) => {
    let query = `DELETE FROM ${table} WHERE ${condition}`
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error)
        reject('DB_ERROR')
      } else {
        resolve(results)
      }
    })
  })
}


// update(table, condition, data) {
//   return new promise((resolve, reject) => {
//     let query = `UPDATE ${table} SET ${Object.entries(data).map(entry =>
//       (entry[0] + '=' + ((entry[1] == null ? entry[1] : "'" + entry[1] + "'"))))} WHERE ${condition}`
//     console.log("query", query)
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.log(error)
//         reject('DB_ERROR')
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

  update(table, condition, body) {
    return new promise((resolve, reject) => {
      let query = `UPDATE ${table} SET ? WHERE ${condition}`
      console.log("query", query)
      connection.query(query, body, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }







}  
module.exports = new DB();