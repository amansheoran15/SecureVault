const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                msg: "Please log in first"
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;
        next();

    }catch (err) {
        return res.status(500).json({
            success: false,
            msg: err
        })
    }
}