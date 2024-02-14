const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    //image
    cover:String,
    //author ids will be a reference to User model
    author:{type:Schema.Types.ObjectId, ref:'User'}
}, {
    //this will be used for details like created at, modified at.
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;