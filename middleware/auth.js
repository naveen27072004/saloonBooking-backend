const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try {
        let token;
        token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({message:"token not found"});
        }
        if(token.startsWith('Bearer ')){
            token = token.slice(7,token.length);
        }
        jwt.verify(token,'saymyname',(err,decoded)=>{
            if(err){
                return res.status(401).json({message:err});
            }
            req.userId = decoded.id;
            req.role = decoded.role;
            req.partnerId = decoded.partnerId;
            next();
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;