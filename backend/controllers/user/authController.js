const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.authCheck = async (req, res) =>{
    try{
        const user = await User.findOne({ _id: req.user_id });

        return res.status(200).json({
            isAuthenticated: true,
            user
        })
    }catch (err){
        return res.status(500).send({
            success: false,
            msg: err.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email
        }).select('+password');

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "User not found"
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if(passwordMatched){
            const token = jwt.sign({
                user_id: user._id,
            }, process.env.JWT_SECRET, {expiresIn: "7d"});

            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure : true,
                sameSite: "none"
            }

            return res.status(200).cookie('token',token,options).json({
                success: true,
                msg: "Logged in",
                user,
                token
            })
        }

        res.status(401).json({
            success: false,
            msg: "Incorrect Password"
        })
    }catch (err) {
        return res.status(500).send({
            success: false,
            msg: err.message
        })
    }
}

exports.logout = async (req, res) => {
    try{
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure : true,
            sameSite: "none"
        }
        return res.status(200).cookie('token',null,options).json({
            success: true,
            msg: "Logged out"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        //TODO zod validation

        let user = await User.findOne({email: email});

        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            profile_img: "./img/user"
        })

        const token = jwt.sign({
            user_id: user._id,
        }, process.env.JWT_SECRET, {expiresIn: "7d"});

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        return res.status(201).cookie('token',token,options).json({
            success: true,
            msg: "User registered",
            user,
            token
        })
    }catch (err) {
        return res.status(500).send({
            success: false,
            msg: err.message
        })
    }
}

