const profile = require('../model/Profile')
module.exports ={
    index:(req,res)=>{
        profile.find({}).then((data)=>{
            res.json(data);
        });
    },
    create:(req,res)=>{
        const page = new profile({ 
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            age:req.body.age,
            userID: req.body.userID
         }); 
        list.save().then(() => res.json({"msg":"profile created"}));
     },
     update: (req,res)=>{
        profile.updateOne({_id:req.params.id},{first_name:req.body.first_name},
            {last_name:req.body.last_name},{age:req.body.age})
        .then(()=>{
            res.json({"msg":"profile is update"});
        });  
    },
    delete:(req,res)=>{
        profile.deleteOne({_id:req.params.id}).then(()=>{
            res.json({"msg":"profile deleted!"});
        });
    }

}