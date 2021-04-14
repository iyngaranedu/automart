const {validationResult} = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: "first post",
            content: "this is the contents",
            imageUrl: "uploads/cars/car-for-sale.jpeg"
        }]
    });
}

exports.storePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
                .json({
                    message: 'Validation failed!', 
                    errors: errors.array()
                });
    }
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: "Post created successfully",
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    });
}