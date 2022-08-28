const Products = require('../models/productModel')

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('_createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryStringlimit * 1 || 9
        const skip = (page -1) *limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }  
}

const productCtrl = {
    getProduct: async(req, res) => {
        try {

            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()

            const products = await features.query
            
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    createProduct: async(req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({message: "no img upload"})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()
            res.json({message: "create product success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({message: "delete product success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    updateProduct: async(req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({message: "no img"})

            await Products.findByIdAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })
            res.json({message: "update success"})
            
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }

}

module.exports = productCtrl