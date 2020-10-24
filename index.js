const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config.json')

const uri = config.mongo_db_config.uri;
const mycollection = config.mongo_db_config.collection_name;
const mydb = config.mongo_db_config.db_name;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.node_port, function(){
    console.log("Server is listening on port %s.", config.node_port);
});

app.post('/records', async (req, res) => {
    console.log(req.body);
    if (req.body.hasOwnProperty("id")) {
        const result = await client.db(mydb).collection(mycollection).findOne({"id":req.body.id})
        if (result){
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.end("ERROR! id: " + req.body.id + " exists!")
        }
        else {
            await client.db(mydb).collection(mycollection).insertOne(req.body, (err, result) => {
                if (err) return console.log("ERROR: " + err);
                console.log("Successfully saved in DB!");
            });
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end("SUCCESS! Provided input is a JSON!\nStoring it!" + req.body);
        }
    }
    else{
        res.end("ERROR! Provided input Does not contain property 'id'!\n");
    }
});

app.get("/records/:id", async (req,res) =>{
    console.log(req.params)
    await client.db(mydb).collection(mycollection).findOne(req.params, {},(error,result) => {
        if (!error) {
            if(result) {
                console.log(result)
                res.send(result)
            }
            else{
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("ERROR id not found!")
            }
        } else {
            console.log(`An error occurred: ${error}`);
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.end("ERROR occurred during DB request.\n")
        }
    });
});

app.get("/records", async (req,res) =>{
    console.log("Asking for all elements from db!")
    const cursor = await client.db(mydb).collection(mycollection).find();
    console.log(await cursor.toArray())
    res.send(await cursor.toArray())
});

app.delete("/records/:id", async (req,res) =>{
    await client.db(mydb).collection(mycollection).findOneAndDelete(req.params, {},
        async (error,result) => {
        if (!error) {
            if (result.value) {
                console.log(result.value);
                res.send(result.value);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("ERROR! Delete id: " + req.params.id + " does not exists!\n")
            }
        }
        else {
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.end("ERROR! Bad request!\n")
        }
    });
});