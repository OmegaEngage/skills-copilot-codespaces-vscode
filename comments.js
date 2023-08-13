//create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//create database
const Datastore = require('nedb');
const db = new Datastore({ filename: 'comments.db', autoload: true });

//enable parsing of posted data
app.use(bodyParser.urlencoded({ extended: true }));

//enable parsing of JSON data
app.use(bodyParser.json());

//enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//static files
app.use(express.static('public'));

//start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//REST API
//GET
app.get('/api', (request, response) => {
    //response.send('Hello World!');
    db.find({}, (err, docs) => {
        if (err) {
            console.log('Error: ' + err);
            response.end();
            return;
        }
        response.json(docs);
    });
});

//POST
app.post('/api', (request, response) => {
    console.log(request.body);
    var data = request.body;
    data.timestamp = Date.now();
    db.insert(data, (err, newDoc) => {
        if (err) {
            console.log('Error: ' + err);
            response.end();
            return;
        }
        response.json(newDoc);
    });
});

//DELETE
app.delete('/api/:id', (request, response) => {
    console.log(request.params.id);
    db.remove({ _id: request.params.id }, {}, (err, numRemoved) => {
        if (err) {
            console.log('Error: ' + err);
            response.end();
            return;
        }
        response.json(numRemoved);
    });
});