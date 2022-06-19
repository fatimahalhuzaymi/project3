const User = require('../model/Users');


module.exports={
    create:(req,res)=>{
        new User(req.body).save().then(()=>{
            res.json({"msg":"user created"})
        });
    }
}