var express = require('express');
var app = express();
const {MongoClient} = require('mongodb');

var bodyParser = require("body-parser");
const { LEGAL_TLS_SOCKET_OPTIONS } = require('mongoose/node_modules/mongodb');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname +'/index.html');
});

app.post('/login', function (req, res) {
    res.sendFile(__dirname+'/login.gif');
});

app.post('/signup', function (req, res) {
    async function main() {    
        const uri ='mongodb+srv://indru:123@mongodb-python.ennub.mongodb.net/onecredit?retryWrites=true&w=majority'
        const client = new MongoClient(uri);
        try {
            await client.connect();
            async function createListing(client, newListing){
                const result = await client.db("onecredit").collection("details").insertOne(newListing);
                console.log(`New listing created with the following id: ${result.insertedId}`);
            }
            await createListing(client,{
               name: req.body.uname,
               password: req.body.pwd,
               email: req.body.email
            }
            );
            res.sendFile(__dirname+'/signup.gif')
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }    
    }
    main().catch(console.error);
    
    
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
