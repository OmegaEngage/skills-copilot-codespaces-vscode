//create web server
//import express
const express = require('express');
//create router
const router = express.Router();
//import comments
const comments = require('../data/comments');

//get all comments
router.get('/', (req, res) => {
    res.json(comments);
});

//get single comment
router.get('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if(found){
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No comment with the id of ${req.params.id}`});
    }
});

//create comment
router.post('/', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        text: req.body.text,
        user: req.body.user,
        post: req.body.post
    }
    if(!newComment.text || !newComment.user || !newComment.post){
        return res.status(400).json({msg: 'Please include a text, user and post'});
    }
    comments.push(newComment);
    res.json(comments);
});

//update comment
router.put('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if(found){
        const updComment = req.body;
        comments.forEach(comment => {
            if(comment.id === parseInt(req.params.id)){
                comment.text = updComment.text ? updComment.text : comment.text;
                comment.user = updComment.user ? updComment.user : comment.user;
                comment.post = updComment.post ? updComment.post : comment.post;
                res.json({msg: 'Comment updated', comment});
            }
        })
    } else {
        res.status(400).json({msg: `No comment with the id of ${req.params.id}`});
    }
});

//delete comment
router.delete('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if(found){
        res.json({msg: 'Comment deleted', comments: comments.filter(comment => comment.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No comment with the id of ${req.params.id}`});
    }
});

//export router
module.exports = router;