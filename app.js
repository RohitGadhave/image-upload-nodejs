const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//init app
const app = express();


//set STORAGE engin

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, calback) => {
        calback(null, Date.now()+ '-' + Math.round(Math.random() * 1E9)+'-' + path.extname(file.originalname));
    }
});

//Init Upload

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },//size in bytes
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('img');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
//EJS
app.set("view engine", "ejs");

//PUBLIC FOLDER

app.use(express.static('./public'));

//routs
app.get('/', (req, res) => {

    res.render('index')

});
app.post('/upload', (req, res) => {


    upload(req, res, (error) => {
        //check for error
        if (error) {
            //res.json({error:error});
            res.render('index', { msg: error });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                //sore req.file obj in db
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`,
                    fileinfo: req.file
                });
            }
        }
    });
});

app.listen(3000, () => console.log("server running"));