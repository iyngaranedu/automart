const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (ex) {
        return res.status(500).json(ex);
    };
}

exports.store = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const user = await User.create({
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'company': req.body.company,
            'address': req.body.address,
            'city': req.body.city,
            'state': req.body.state,
            'country': req.body.country,
            'phoneNumber': req.body.phoneNumber,
            'email': req.body.email,
            'password': hashedPassword
        });

        res.status(201).json({
            message: "User created successfully",
            user: user
        });
        
    } catch (ex) {
        return res.status(500).json(ex);
    };
}

exports.show = async (req, res, next) => {
    try {
        const userId = req.params.uuid;
        const user = await User.findOne({ where: { uuid: userId } });
        return res.status(200).json(user);
    } catch (ex) {
        return res.status(500).json(ex);
    }
}

exports.update = async (req, res, next) => {
    try {
        const userId = req.params.uuid;
        const userObj = await User.findOne({ where: { uuid: userId } });

        const user = await userObj.update({
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'company': req.body.company,
            'address': req.body.address,
            'city': req.body.city,
            'state': req.body.state,
            'country': req.body.country,
            'phoneNumber': req.body.phoneNumber,
        });
        res.status(200).json({
            message: "User updated successfully",
            user: user
        });
    } catch (ex) {
        return res.status(500).json(ex);
    };
}

exports.destroy = async (req, res, next) => {
    try {
        const userId = req.params.uuid;
        const user = await User.findOne({ where: { uuid: userId } });
        await user.destroy();
        return res.status(204).json([]);
    } catch (ex) {
        return res.status(500).json(ex);
    }
}