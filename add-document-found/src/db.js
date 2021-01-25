const mongo = require("mongodb");

function createConnection(){
    return new Promise((resolve, reject)=>{
         mongo.connect("mongodb://mongo:27017", (error, client)=>{
            if(error) return reject(error);
            resolve(client); 
        });
    });
    
}




module.exports = {
    createConnection:createConnection
};