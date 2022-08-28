const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
       try {
           const categories = await Category.find()
           res.json(categories)
       } catch (err) {
           return res.status(500).json({message: err.message})
       }
    },
    createCategory: async (req, res) => {
        try {
            // user role = 1 => admin
            // only admin can create update delete category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({message: "the category exist"})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({message: "create category success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({message: "delete category success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({message: "update category success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = categoryCtrl