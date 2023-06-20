const jwt =require('jsonwebtoken')

module.exports=(req,res,next ) =>{
let token;
   try{
    console.log(
        req.headers
    )
     token = req.headers.token.split(' ')[1]
     console.log('token = ' , token)
    if(!token){
        return res
        .status(401)
        .json({ message: "Authentication failed !!" });
    }
    const decodedToken = jwt.verify(token ,  "dont share")
    req.userData = {userId : decodedToken.userId}
    //next() to continue access the other routes and add data to the request
    next();
   }catch(err){
    return res
    .status(401)
    .json({ message: "Authentication failed !" });
   }

}