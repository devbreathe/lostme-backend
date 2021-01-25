const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

let mongodb = require('./db').createConnection;
let rabbit = require('./rabbit');

function createPub(){
    const channel = 'test';
    rabbit.then((con)=>{
        con.createChannel().then((ch)=>{
            return ch.assertQueue(channel)
            .then((ok)=>{
                return ch.sendToQueue(channel, Buffer.from("Hey Devs"));
                
            })
        })
    }).catch(error => console.log(error));
}


function saveDocument(data){
    return new Promise ((resolve, reject)=>{
        mongodb().then((client)=>{
            let mydb = client.db("lostme");
            mydb.collection("documents").save(data, (error, result)=>{
                if(error) return reject(error);
                resolve(result); 
            }); 
        }).catch((error)=>{
            reject(error);
        });
    });
}

function addDocumentFound(data){
    return new Promise((resolve, reject)=>{
        saveDocument(data).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));
app.post('/v1/document', (req, res) => {
    const document = req.body;
    console.log("data ", document);
    if(document !== "") {
        addDocumentFound(document).then(response => {
            
            createPub();

            res.json({
                result: response
            });
        });
    }else {
        res.json({
            result: "Error to add  document"
        })
    }

});

app.listen(3005);
