const todo = require('../model/todo')
module.exports ={
    index:(req,res)=>{
        todo.find({}).then((data)=>{
            res.json(data);
        });
    },
  
    create:(req,res)=>{
        const list = new todo({ 
            text: req.body.text,
            Tags:req.body.Tags,
            userID: req.body.userID,
            is_complete:req.body.is_complete
         }); 
        list.save().then(() => res.json({"msg":"todo created"}));
     },
     update: (req,res)=>{
        todo.updateOne({_id:req.params.id},{text:req.body.text},{Tags:req.body.Tags})
        .then(()=>{
            res.json({"msg":"todo is update"});
        });  
    },
    delete:(req,res)=>{
        todo.deleteOne({_id:req.params.id}).then(()=>{
            res.json({"msg":"todo deleted!"});
        });
    }

}