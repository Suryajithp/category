const db = require('../config/connection')
const collection = require('../config/collection')
const objectId = require('mongodb').ObjectId



module.exports = {


    addCategory: async (req, res) => {
        const Category = req.body

        try {
            let categoryExist = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ category: Category.category })
            if (categoryExist) {
                res.status(500).json({ msg: "category exist" })
            } else {
                db.get().collection(collection.CATEGORY_COLLECTION).insertOne(Category).then((data) => {
                    res.status(200).json({ msg: "category added" })
                }).catch(() => console.log('error'))
            }
        } catch (error) {
            console.log('error')
        }



    },

    getCategory: async (req, res) => {
        try {
            category = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            if (category) {
                res.status(200).json(category)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log('error')
        }
    },

    addSubCategory: async (req, res) => {
        const { subcategory, categroydata } = req.body
        const data = {
            categoryId: objectId(categroydata),
            subcategory: subcategory
        }
        db.get().collection(collection.SUBCATEGORY_COLLECTION).insert(data).then((data) => {
            res.status(200).json({ msg: "category added" })
        }).catch(() => console.log('error'))
    },

    getSubCategory: async (req, res) => {
        try {
            const subcategory = await db.get().collection(collection.SUBCATEGORY_COLLECTION).find({ categoryId: objectId(req.params.id) }).toArray()
            if (subcategory) {
                res.status(200).json(subcategory)
            }
        } catch (error) {
            console.log('error')
        }


    },

    addPost: (req, res) => {
        const { product, categroy, subCategroyId } = req.body
        const Data = {
            product: product,
            categroy: objectId(categroy),
            subCategroyId: objectId(subCategroyId)
        }
        db.get().collection(collection.PRODUCT_COLLECTION).insert(Data).then((data) => {
            res.status(200).json({ msg: "category added" })
        }).catch(() => console.log('error'))
    },

    getAllPost: async (req, res) => {
        try {
            const products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            if (products) {
                res.status(200).json(products)
            }
        } catch (error) {
            console.log('error')
        }

    },

    getPost: async (req, res) => {
        const categoryId = req.params.id
        try {
            const products = await db.get().collection(collection.PRODUCT_COLLECTION).find({ categroy: objectId(categoryId) }).toArray()
            if (products) {
                console.log(products);
                res.status(200).json(products)
            }
        } catch (error) {
            console.log('error')
        }

    },

    getSubPost: async (req, res) => {
        const categoryId = req.params.id
        try {
            const products = await db.get().collection(collection.PRODUCT_COLLECTION).find({ subCategroyId: objectId(categoryId) }).toArray()
            if (products) {
                console.log(products);
                res.status(200).json(products)
            }
        } catch (error) {
            console.log('error')
        }

    }
}