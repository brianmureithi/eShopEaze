import bcrypt from 'bcryptjs';
const data ={
    users:[
        {
            name:'Brian',
            email:'brianmurithi65@gmail.com',
            password:bcrypt.hashSync('letmein',8),
            isAdmin: true,
        },
        {
            name:'Lanoi',
            email:'lanoitikani@gmail.com',
            password:bcrypt.hashSync('letmein',8),
            isAdmin:false,
        },


    ],
    products:[
        {
          
            name:'Samsung TV',
            category:'Electronics',
            image:'/images/p1.jpg',
            price:30000,
            countInStock:10,
            brand:'Samsung',
            rating:4.5,
            numReviews:10,
            description:'Nice high Quality 4k TV'
        },
        {
          
            name:'Phoenix Bike',
            category:'Bicycles',
            image:'/images/p2.jpg',
            price:10000,
            countInStock:0,
            brand:'Phoenix',
            rating:4.5,
            numReviews:18,
            description:'Nice high Quality bike'
        },{
  
        name:'Quartz watch',
        category:'Watches',
        image:'/images/p3.jpg',
        price:1299,
        countInStock:20,
        brand:'Quartz',
        rating:4,
        numReviews:16,
        description:'Nice high Quality watch'
    },
    {
       
        name:' Xiaomi mobile phone',
        category:'Phone',
        image:'/images/p5.jpg',
        price:20000,
        countInStock:8,
        brand:'Xiaomi',
        rating:2.5,
        numReviews:30,
        description:'Sleek fast phone'
    },
    {
     
        name:' Dark Grey Khaki Slim Pants',
        category:'Pants',
        image:'/images/p6.jpg',
        price:1300,
        countInStock:13,
        brand:'Levi',
        rating:4.5,
        numReviews:26,
        description:'Nice high Quality Pants'
    },
    {
       
        name:' Hisense cooker',
        category:'Cooker',
        image:'/images/p4.jpg',
        price:27350,
        countInStock:16,
        brand:'Hisense',
        rating:3.5,
        numReviews:23,
        description:'Efficient cooker 10 year warranty'
    },
    {
     
        name:' Dark Grey Khaki Slim',
        category:'Pants',
        image:'/images/p6.jpg',
        price:1300,
        countInStock:13,
        brand:'Levi',
        rating:4.5,
        numReviews:26,
        description:'Nice high Quality Pants'
    },
  
    {
     
        name:' Dark Grey Khaki Slim Pant',
        category:'Pants',
        image:'/images/p2.jpg',
        price:1300,
        countInStock:13,
        brand:'Levi',
        rating:4.5,
        numReviews:26,
        description:'Nice high Quality Pants'
    }
   

    ]
}
export default data; 