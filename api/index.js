const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
//From multer's documentation
//All form uploaded images will be saved in uploads folder after create post button is clicked.
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+"/uploads"));

//used for hashing password
const salt = bcryptjs.genSaltSync(10);
//for jwt
const secret = 'csef8w948wrkjwrk38udoad9';

mongoose.connect('mongodb+srv://ajayvinjamuri013:HtdOkZnTLiMIvaFS@cluster0.2smiiur.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',async (req, res)=>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create(
            {
                username, 
                password: bcryptjs.hashSync(password, salt)
            }
        );
        res.json(userDoc);
    } catch(e) {
        console.log(e)
        res.status(400).json(e);
    }
})

app.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passwordOk = bcryptjs.compareSync(password, userDoc.password);
    if(passwordOk){
        //using callback
        const token = jwt.sign({username,id: userDoc._id},secret);//,{},(error, token)=>{
            //if(err) throw err;
            res.cookie('token',token).json({
                id: userDoc._id,
                username,
            });
        //});
    }
    else{
        res.status(400).json("invalid credentials.")
    }
})

app.get("/profile", (req, res)=>{
    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})
    res.json(info);
})

app.post('/logout', (req, res)=>{
    res.cookie('token','').json('ok!');
})

app.post('/post',uploadMiddleware.single('file'),async (req, res)=>{
    const {originalname, path} = req.file; 
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+"."+ext;
    //with the below line, the image will be saved along with the extension in the uploads folder.
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})

    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    
    res.json(postDoc);
})

app.get('/post',async (req, res)=>{
    res.json(
        await Post.find()
                  .populate('author', ['username'])
                  .sort({createdAt:-1})
                  .limit(20)
        )
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    //using populate to get author detaails using authorid.
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})
app.listen(4000);