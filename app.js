const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//init app
const app = express();


//set STORAGE engin

const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req , file,calback)=>{
        calback(null,Date.now()+path.extname(file.originalname));
    }
});

//Init Upload

const upload = multer({
    storage:storage
}).single('img');

//EJS
app.set("view engine","ejs");

//PUBLIC FOLDER

app.use(express.static('./public'));

//routs
app.get('/' , (req , res)=>{

   res.render('index')

})
app.post('/upload' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.listen(3000,()=>console.log("server running"));