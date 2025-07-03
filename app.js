const express = require('express');
require('dotenv').config({ path: '.env.development' });
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');


const { seedDummyTickets } = require('./app/seed/ticket.seed');
const { ticketList } = require('./app/model/ticket.model');


const app = express();

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'resource', 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./routes/auth.route');
const dasbordRoutes = require('./routes/dasbord.route');
const cartRoutes = require('./routes/cart.route');
const checkoutRoutes = require('./routes/checkout.route');

// app.get('/', (req, res) => {
//     const data = "ary"; 
//     res.render('index', {data});
// });

seedDummyTickets(ticketList);
// console.log(ticketList.findAll());


app.use('/', authRoutes);
app.use('/', dasbordRoutes);
app.use('/', cartRoutes);
app.use('/', checkoutRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})