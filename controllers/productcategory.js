const  { Product } = require('../models')

class productController {

    static async createProduct(req, res) {
        try {
            const { 
                title,
                price,
                stock,
                CategoryId
            } = req.body

            const data = await Product.create({
                title,
                price,
                stock,
                CategoryId
            })

            const response = {
                id: data.id,
                title: data.title,
                price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price),
                CategoryId: id,
                updatedAt: new Date(),
                createdAt: new Date()
            }

            res.status(201).json(response)
        } catch (error) {
            res.status(401).json({
                code: 401,
                msg: "data gagal di buat"
            })
            console.log(error);
        }
    }

    static async getAllProduct(req, res) {
        try {
            const { 
                title,
                price,
                stock
            } = req.body

          const data = await Product.findAll({
          include: ["Category"]
          })
          console.log(data);
          const response = data.map((product) => {
            return {
                id: product.id,
                title: product.title,
                price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price),
                stock: product.stock,
                createdAt: new Date(),
                updatedAt: new Date()
            }
          })
        //   const response = {
        //     id: data.id,
        //     title: data.title,
        //     price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price),
        //     stock: data.stock,
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //  }
         console.log(data.CategoryId);

          res.status(201).json(response)
        } catch (error) {
            res.status(401).json(error)
            console.log(error);
        }
    }
}

module.exports = productController