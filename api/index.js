const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

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
            res.cookie('token',token).json('ok!');
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


app.listen(4000);