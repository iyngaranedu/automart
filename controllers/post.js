const {validationResult} = require('express-validator');
const {Post} = require('../models');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: "first post",
            content: "this is the contents",
            imageUrl: "uploads/cars/car-for-sale.jpeg"
        }]
    });
}

exports.storePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
                .json({
                    message: 'Validation failed!', 
                    errors: errors.array()
                });
    }

    try{
        const post = await Post.create({
            'title': req.body.title, 
            'make': req.body.make,
            'model': req.body.model,
            'year': req.body.year,
            'price': req.body.price,
            'negotiable': req.body.negotiable
        });
    
        res.status(201).json({
            message: "Post created successfully",
            post: post
        });
    } catch(ex) {
        res.status(500).json(ex);
    }
}