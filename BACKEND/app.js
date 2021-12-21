const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors  = require ('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors())


//Middleware
app.use(express.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

//Routes
const categoriesRoutes = require('./routers/categories');
const productRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');




//Routers
app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);







mongoose.connect(process.env.CONNECTION_STRING, {
 // useNewUrlPaser:true,
  useUnifiedTopology: true,
  dbName: 'eshop-database'
}).then(()=>{
  console.log('Database Connection is ready...')
})
.catch((err) =>{
  console.log(err);
})

app.listen(3000, ()=>{
    
    console.log('server is running http://localhost:3000');
})