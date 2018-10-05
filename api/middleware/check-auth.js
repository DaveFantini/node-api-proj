const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        //the header of the request have to contain the token 
        //which is stored in the authorization field and it is 
        //preceduto by "Bearer " so by splitting the string i can 
        //obtain the token itself 
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
         //if we succesfully auth
    next();
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
   

   
}