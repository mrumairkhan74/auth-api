const jwt = require('jsonwebtoken');
const User = require('../model/apiModel');




const auth = async (req,res,next)=>{
 
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(token, "umair");
        const user = await User.findOne({
            _id: decoded._id,
             "tokens.token":token
        }) 
        if(!user){
            throw new Error()
        }
        req.user = user;
        next();

    }catch(error){
        res.send({error: "please Auth"})
    }

}

module.exports = auth;