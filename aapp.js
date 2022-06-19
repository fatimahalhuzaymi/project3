const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = 8000;
const saltRounds = 10;
const mySecret = 'secret'
const routes = require('./routes/index');
app.use(express.json());
app.use('/',routes);



mongoose.connect('mongodb://localhost:27017/Project');
const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});

const UserModel = mongoose.model('user',userSchema);

app.use(express.json());

app.get('/',(req,res)=>{
    UserModel.find({}).then(data=>res.json(data));
});

app.post('/user/create',(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        UserModel.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })
        .then(()=>res.json({"msg":"user created"}));
    });
});

app.post('/user/login',(req,res)=>{
    UserModel.findOne({email:req.body.email}).then((user)=>{
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                let token = jwt.sign({name:user.name,id:user._id},mySecret);
                res.json({"msg":"User logged in","token":token});
            }else{
                res.json({"msg":"Invalid password"});
            }
        });
    });
});


//app.post('/user/register',(req,res));

app.post('/verify',(req,res)=>{
    jwt.verify(req.body.token, mySecret, function(err, decoded) {
        if(decoded){
            res.json({"msg":`hello ${decoded.id}`});
        }else{
            res.json({"msg":"invalid token"});
        }
      });
});

app.put('/user/update/:id',(req,res)=>{
    UserModel.updateOne({_id:req.params.id},req.body)
    .then(()=>res.json({"msg":"user updated"}));
});

app.delete('/user/delete/:id',(req,res)=>{
    UserModel.deleteOne({_id:req.params.id})
    .then(()=>res.json({"msg":"user deleted"}));
});


app.listen(PORT,()=>console.log(`Express running on port: ${PORT}`));
app.listen(3000,()=>console.log('express started!'));