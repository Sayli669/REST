const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/NodeConnection',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(error,result)=>{
    if(error){
        console.log(error);
    }
    console.log('connneted');
    result.createCollection("MyCollection",(err,res)=>{
        if (err) throw err;
        console.log("Collection created!");
    })  
    
})

