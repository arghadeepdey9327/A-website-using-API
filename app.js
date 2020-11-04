const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const { title } = require("process");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true,useUnifiedTopology:true});
const toSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    title: String
});
const Article=mongoose.model("article",toSchema);
app.route("/a")
.get(function(req,res){
    Article.find(function(err,res){
        console.log(res);
    });
})
.post(function(req,res){
    const go=new Article({
        title:req.body.title,
        content:req.body.content
    });
  go.save(function(err){
      if(!err){
          res.send("Good");
      }
      else{
          res.send(err);
      }
  })
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Success");
        }
        else{
            res.send(err);
        }
    });
});
app.route("/a/:var")
.get(function(req,res){
    Article.findOne({title:req.params.var},function(err,doc){
        if(!err){
            res.send(doc);
        }
        else{
            res.send(err);
        }
    });
})
.push(function(req,res){
    Article.insertMany()
});
app.listen(3000,function(){
    console.log("Server is start");
});