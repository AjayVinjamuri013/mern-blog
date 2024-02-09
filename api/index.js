const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');

app.use(cors());
app.use(express.json());

//used for hashing password
const salt = bcryptjs.genSaltSync(10);

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

    }
    else{
        res.status(400).json("invalid credentials.")
    }
})

app.listen(4000);