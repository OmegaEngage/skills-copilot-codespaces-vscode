//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./model/comment');
var cors = require('cors');
var path = require('path');
var port = 8080;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/comment');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
//set up static file
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next){
	console.log('Something is happening.');
	next();
});

//test route to make sure everything is working
router.get('/', function(req, res){
	res.json({message: 'hooray! welcome to our api!'});
});

//on routes that end in /comments
//----------------------------------------------------
router.route('/comments')
	//create a comment (accessed at POST http://localhost:8080/api/comments)
	.post(function(req, res){
		var comment = new Comment();
		comment.content = req.body.content;
		comment.author = req.body.author;
		comment.date = req.body.date;
		comment.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'Comment created!'});
		});
	})
	//get all the comments (accessed at GET http://localhost:8080/api/comments)
	.get(function(req, res){
		Comment.find(function(err, comments){
			if(err){
				res.send(err);
			}
			res.json(comments);
		});
	});

//on routes that end in /comments/:comment_id
//----------------------------------------------------
router.route('/comments/:comment_id')
	//get the comment with that id (accessed at GET http://localhost:8080/api/comments/:comment_id)
	.get(function(req, res){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				res.send(err);
			}
			res.json(comment);
		});
	})
	//update the comment with this id (accessed at PUT http://localhost:8080/api/comments/:comment_id)
	.put(function(req, res){
		Comment.findById(req.params.comment_id, function(err, comment){
			if


