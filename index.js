require('dotenv').config();
const express = require('express');
const { configMongo } = require('./config/mongo');
const { json } = require('body-parser');
const cors = require('cors');

//config
const app = express();
configMongo();

//middleware
app.use(json());
app.use(cors());

//config routes
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

//routes
app.use('/api/auth', require('./routes/auth/signUp'));
app.use('/api/auth', require('./routes/auth/signIn'));
app.use('/api/auth', require('./routes/auth/update'));
app.use('/api/auth', require('./routes/auth/getUser'));

app.use('/api/products', require('./routes/products/createProduct'));
app.use('/api/products', require('./routes/products/getAll'));
app.use('/api/products', require('./routes/products/getBy'));
app.use('/api/products', require('./routes/products/update'));
app.use('/api/products', require('./routes/products/delete'));

app.use('/api/orders', require('./routes/orders/create'));
app.use('/api/orders', require('./routes/orders/getBy'));
app.use('/api/orders', require('./routes/orders/updateToPayed'));

app.use('/api/wishlist', require('./routes/wishlist/add'));
app.use('/api/wishlist', require('./routes/wishlist/get'));
app.use('/api/wishlist', require('./routes/wishlist/removeItem'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVIDOR INICIADO\nPUERTO:`, PORT);
});
