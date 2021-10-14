const express = require('express'); 
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect'); 

const userRoute = require('./routes/users/usersRoute');
const {errorHandler,notFound} = require('./middlewares/errorMiddleware');
const app = express();
//env
dotenv.config(); 

//const logger = (req,res,next)=>{
  //  console.log("Sono loggato ");
  //  next();
//};
//app.use(logger);

//dbconnect
dbConnect();
//middlewares
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({msg:'Benvenuto SpesaTracker API'})
});
//routes
app.use('/api/users',userRoute);


//error
app.use(notFound);
app.use(errorHandler);





module.exports=app;

//xN6CIFh2PfnNSvmN
//mongodb+srv://me:<password>@spesa-tracker.vx7ij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority