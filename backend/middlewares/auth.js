const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Please log in"
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    }catch (e) {
        return res.status(500).json({
            success: false,
            msg: e
        })
    }
}