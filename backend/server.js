import express, { response } from 'express';
import request from 'request';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import bodyParser from 'body-parser';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
const port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`);
});
app.get('/access_token', access, (req,res) =>{
    res.status(200).json({access_token: req.access_token})
  
})

/* app.get('/register', access, (req, resp)=>{
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"

    let auth ="Bearer " + req.access_token
    
   
    
   request({

        url: url,
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization':auth
        },
        json:{
               "ShortCode": "600999",
            "ResponseType": "Completed",
            "ConfirmationURL": "https://192.168.0.112:80/confirmation",
            "ValidationURL": "https://192.168.0.112:80/validation"

        }

    },function(error,response,body){
        if(error){
            console.log(error)
        }
        resp.status(200).json(body)
    }) 
}) */
app.get('/register', access, (req, resp) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    let auth = "Bearer " + req.access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": "600999",
                "ResponseType": "Complete",
                "ConfirmationURL": "http://197.248.86.122:801/confirmation",
                "ValidationURL": "http://197.248.86.122:801/validation"
            }
        },
        function (error, response, body) {
            if (error) { console.log(error) }
            resp.status(200).json(body)
        }
    )
})

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    console.log(req.body)
})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .............')
    console.log(req.body)
})


app.post('/reverse_result_url', (req, res) => {
    console.log("--------------------Reverse Result -----------------")
    console.log(JSON.stringify(req.body.Result.ResultParameters))
})

app.post('/reverse_timeout_url', (req, res) => {
    console.log("-------------------- Reverse Timeout -----------------")
    console.log(req.body)
})

app.post('/b2c_result_url', (req, res) => {
    console.log("-------------------- B2C Result -----------------")
    console.log(JSON.stringify(req.body.Result))
})

app.post('/b2c_timeout_url', (req, res) => {
    console.log("-------------------- B2C Timeout -----------------")
    console.log(req.body)
})

app.post('/stk_callback', (req, res) => {
    console.log('.......... STK Callback ..................')
    console.log(JSON.stringify(req.body.Body.stkCallback))
})

app.post('/bal_result', (req, resp) => {
    console.log('.......... Account Balance ..................')
    console.log(req.body)
})

app.post('/bal_timeout', (req, resp) => {
    console.log('.......... Timeout..................')
    console.log(req.body)
})


function access(req, res, next){
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer.from('CcXhqOew3G1kMjlUTy7ScA3rbVm96xT1:aeJrsoQg4HBA6fVB').toString('base64');
    


    request({
        url:url,
        headers:{
            "Authorization": "Basic " + auth
        }

    }, (error, response, body)=>{
        if(error){
            console.log(error);
        }
        else{
            req.access_token = JSON.parse(body).access_token
            next()
            
        }

    })


}