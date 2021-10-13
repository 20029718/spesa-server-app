const mongoose= require("mongoose");
const { Schema } = mongoose;
const bcrypt =require("bcryptjs");
//schema
const userSchema =  new Schema({
        firstname: {
            required: [true,'Il nome è richiesto'],
            type: String,  
        },
        lastname: {
            required: [true,'Il cognome è richiesto'],
            type: String,   
        },
        email: {
            required: [true,'Email è richiesto'],
            type: String,  
        },
        password: {
            required: [true,'Password richiesta'],
            type: String,
        }, 
        IsAdmin: {
            type: Boolean, 
            default: false,
        },
        
    },
    {
        timestamp: true,
    }
);

//hash  Password 

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//compile.schema nel model
const User = mongoose.model('User',userSchema);
module.exports = User;