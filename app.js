const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

var expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const Product =  require('./models/Product');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/default');

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

const productRoutes = require('./routes/productRoutes');

let mongoUrl = "mongodb+srv://thantpyaes01:Password01@cluster0.b1of48s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
        console.log('listening on port 3000...');
        
    })
}) .catch(e => {
    console.log(e);
    
})

app.get('/', (req, res) => {
    res.render('index', {
        title: 'index'
    })
})

app.get('/home', (req, res) => {
    res.redirect('/index');
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'contact'
    })
})

app.get('/contact-us', (req, res) => {
    res.redirect('/contact');
})

app.use('/products', productRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    })
})

module.exports = app;