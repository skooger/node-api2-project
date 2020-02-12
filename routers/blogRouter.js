const express = require('express');
const database = require('../data/db.js');
const router = express.Router();


//Get Requests
router.get('/', (req,res) => {

    database.find()
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/:id', (req,res) => {
    const {id} = req.params;

    database.findById(id)
            .then(post => {
                if(!post){
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
                res.status(200).json(post);
            })
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

})

router.get('/:id/comments', (req,res) => {
    const {id} = req.params;

    database.findPostComments(id)
            .then(post => {
                if(!post){
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
                res.status(200).json(post);
            })
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

})

router.post('/', (req,res) => {

    const {title, contents} = req.body
    if(!title || !contents){

        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{

        database.insert({title, contents})
                .then(post => {
                    
                    res.status(201).json(post);
                })
                .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

    }

})

router.post('/:post_id/comments', (req,res) => {

    const {text} = req.body;
    const {post_id} = req.params;

    if(!text){

        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }else{

        database.insertComment({text, post_id})
                .then(post => {
                    
                    res.status(201).json(post);
                })
                .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

    }

})

router.delete('/:id', (req,res) => {

    const {id} = req.params;

    if(!database.findById(id)){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    database.remove(id)
            .then(post => {
                
                res.status(200).json(post);
            })
            .catch(err => res.status(500).json({ error: "The post could not be removed" }))


})

router.put('/:id', (req,res) => {

    const {id} = req.params;

    if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    if(!database.findById(id)){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

    database.update(id, req.body)
            .then(post => {
                
                res.status(200).json(post);
            })
            .catch(err => res.status(500).json({ error: "The post could not be removed" }))


})




module.exports = router;