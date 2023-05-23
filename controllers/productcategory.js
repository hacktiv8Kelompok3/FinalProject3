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
                CategoryId: data.CategoryId,
                updatedAt: new Date(),
                createdAt: new Date()
            }

            res.status(201).json({products:response})
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const validasiErorr = {};
                error.errors.map((er) => {
                    validasiErorr[er.path] = er.message;
                });
                return res.status(400).json({"error":validasiErorr});
            }else{
                res.status(error?.code || 500).json(error)
            }
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