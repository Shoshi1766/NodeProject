import {connect} from './config/DB.js';
import express from 'express';
import cors from 'cors'
import flowerRouter from './routers/Flower.js';
import userRouter from './routers/User.js';
import orderRouter from './routers/Order.js'
import {config} from 'dotenv';

//פונקציה שתומכת במשתני סביבה
config();
//ניסוי ההתחברות 
//למונגו אטלס
connect().then(()=>{
    console.log('mongo connect successfully');
}).catch((err)=>{
    console.log("err with connect to mongo: \n"+err);
    process.exit(1);
})
//שימוש בספרית express לצורך הפעלת השרת
const app=express();
app.use(express.json());
// const cors = require('cors');
app.use(cors({origin:"*",methods:"*"}));

//הפניה לroutes
app.use('/flowers', flowerRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

//הפעלת השרת
//על הפורט שכתוב בקובץ env
app.listen(process.env.PORT, ()=>{
    console.log(`app is listen on port ${process.env.PORT}`);
})