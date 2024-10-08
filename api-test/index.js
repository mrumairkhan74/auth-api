const express = require('express');
const data = require('./connection/apiConnection')
const routes = require('./routes/apiRoute');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes)


app.listen(3000, ()=>{
    console.log('Server running');
})