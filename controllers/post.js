const {validationResult} = require('express-validator');
const {Post, User} = require('../models');

exports.getAll = async (req, res, next) => {
    try{
        const posts = await Post.findAll({include: ['user']});
        return res.status(200).json(posts);
    } catch(ex) {
        return res.status(500).json(ex);
    }
}

exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
                .json({
                    message: 'Validation failed!', 
                    errors: errors.array()
                });
    }

    try{
        const userId = req.body.uuid;
        const user = await User.findOne({ where: { uuid: userId } });

        const post = await Post.create({
            'title': req.body.title, 
            'make': req.body.make,
            'model': req.body.model,
            'year': req.body.year,
            'price': req.body.price,
            'negotiable': req.body.negotiable,
            'userId': user.id
        });
    
        res.status(201).json({
            message: "Post created successfully",
            post: post
        });
    } catch(ex) {
        res.status(500).json(ex);
    }
}

exports.show = async (req, res, next) => {
    try{
        const uuid = req.params.uuid;
        const post = await Post.findOne({ where: { uuid: uuid}, include:['user']});
        if (!post) {
                return res.status(404).json({});
        }
        return res.status(200).json(post);
    } catch(ex) {
        return res.status(500).json(ex);
    }
}

exports.update = async (req, res, next) => {
    try{
        const uuid = req.params.uuid;
        const postObj = await Post.findOne({ where: { uuid: uuid}});
       
        const post = await postObj.update({
            'title': req.body.title, 
            'make': req.body.make,
            'model': req.body.model,
            'year': req.body.year,
            'price': req.body.price,
            'negotiable': req.body.negotiable
        });
       
        res.status(200).json({
            message: "Post updated successfully",
            post: post
        });
    } catch(ex) {
        return res.status(500).json(ex);
    }
}

exports.destroy = async (req, res, next) => {
    try{
        const uuid = req.params.uuid;
        const post = await Post.findOne({ where: { uuid: uuid}});
        await post.destroy();
        return res.status(204).json([]);
    } catch(ex) {
        return res.status(500).json(ex);
    }
}