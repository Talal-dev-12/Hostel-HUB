const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/hostelhub").then(()=>{
    console.log("Mongo DB Connected")
}).catch((err)=>{
    console.log("Connection Failed MongoDB", err)
})