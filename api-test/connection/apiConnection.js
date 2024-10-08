const mongoose = require('mongoose');

const data = mongoose.connect('mongodb://localhost:27017/test');

data.then(()=>{
 console.log('database connected');
})
.catch((error)=>{
    console.lof(error);
})


module.exports = data;