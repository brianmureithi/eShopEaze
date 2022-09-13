import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/eazishop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req,res) =>{
    res.send(process.env.PAYMENT_CLIENT_ID || 'sb');
});
app.get('/',(req,res) =>{
    res.send('Server is up and running');
});
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
}

app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});  
});
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`);
});