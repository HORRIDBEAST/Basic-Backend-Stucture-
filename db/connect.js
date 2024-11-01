const mongu=require('mongoose');
const connecttoMDB=(url)=>{
    mongu.set('strictQuery',false)
    return mongu.connect(url)
    .then(()=>console.log("Connected to Mongo Successfully"))
    .catch((err)=>console.log("ERROR ENCEOUNTERDD TO CONNECT TO MONOG",err));
}
module.exports={
    connecttoMDB,
}