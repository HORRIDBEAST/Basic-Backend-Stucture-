const mongu=require('mongoose');

const IncomeSchema=new mongu.Schema({
    title:{
        type:String ,
        required:true,
        trim:true,
        maxLength:50,
    }
    ,
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true,
    }
,
description:{
    type:String ,
    default:"income",
}
,
date:{
    type:Date,
    required:true,
    trim:true,
}
,
category:{
    type:String ,
    required:true,
    maxLength:30,
    trim:true,
}
},{timestamps:true})

module.exports=mongu.model('Income',IncomeSchema);
