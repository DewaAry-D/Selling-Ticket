const express = require('express');
require('dotenv').config({ path: '.env.development' });
const path = require('path');
const cookieParser = require('cookie-parser');

const { adminPromise } = require('./app/model/admin.model');

const app = express();

app.set('views', path.join(__dirname, 'resource', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./routes/auth.route');
const ticketApplicationRoutes = require('./routes/ticket_application.route');
const managementApplicationRoutes = require('./routes/management_application.route');
const cartRoutes = require('./routes/cart.route');

// app.get('/', (req, res) => {
//     const data = "ary"; 
//     res.render('index', {data});
// });

(async () => {
    const admin = await adminPromise;
    console.log('Admin berhasil dibuat saat server start:');
    console.log(admin.toJSON());
})();


app.use('/', authRoutes);
app.use('/', ticketApplicationRoutes);
app.use('/', managementApplicationRoutes);
app.use('/', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})