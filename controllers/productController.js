const Product = require('../models/Product');

const productController = {
    store : async (req, res) => {
        let {title} = req.body;
        let product = new Product ({
            title
        })
        await product.save();
        res.redirect('/products'); 
    },

    create : (req, res) => {
        res.render('products/create', {
            title: 'create'
        })
    },

    show : async (req, res) => {
        try {
            let id = req.params.id;
            let product = await Product.findById(id);
            res.render('products/show', {
                product,
                title : 'Product Details'
            })
        }catch (e) {
            console.log(e);
            res.status(404).render('404', {
                title: '404'
            })
        }
    },

    destroy : async (req, res, next) => {
        try {
            let id = req.params.id;
            await Product.findByIdAndDelete(id);
            res.redirect('/products');
        } catch (e) {
            console.log(e);
            next();
        }
    },

    product : async(req, res) => {
        let products = await Product.find();
        console.log(products);
    
        res.render('products', {
            products, 
            title: 'products'
        });
    }
}

module.exports = productController;