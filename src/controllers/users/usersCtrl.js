const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User");
//register
const registerUser= expressAsyncHandler(async (req, res) => {
    const { email, firstname, lastname, password } =  req?.body;

    //vedo se gli utenti esistono
    const userExists = await User.findOne({ email });
    if(userExists) 
       throw new Error("Questo utente esiste già");
    try { 
        //gli oggetti che voglio creare
        const user = await User.create({ email, firstname, lastname, password });
        res.status(200).json(user);
    } catch (error) {
        res.json(error); 
   }
});

//fetch di tutti gli utenti per
const fetchUsersCtrl= expressAsyncHandler(async(req,res) =>{
    try{
        const users = await User.find({});
        res.json(users);
    }catch(error){
        res.json(error);
    }
});
module.exports = {registerUser, fetchUsersCtrl};