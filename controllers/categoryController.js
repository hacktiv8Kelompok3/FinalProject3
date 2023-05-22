const {Category} = require('../models')

class categoryController {

    static async createCategory(req, res) {
        try {
            const { 
                id,
                type
            } = req.body


            const data = await Category.create({
                id,
                type
            })

            

            const response = {
                id: data.id,
                type: data.type,
                sold_product_amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.sold_product_amount),
                createdAt: new Date(),
                updatedAt: new Date()
            }

            res.status(201).json(response)
        } catch (error) {
            res.status(401).json(error)
            console.log(error);
        }
    }
}

module.exports = categoryController