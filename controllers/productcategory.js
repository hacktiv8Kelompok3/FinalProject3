const  { Product,Category } = require('../models')

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
          const data = await Product.findAll({})
            const response = data.map((product) => {
                console.log(product.categoryId)
            return {
                id: product.id,
                title: product.title,
                price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price),
                stock: product.stock,
                CategoryId: product.CategoryId,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
              }
          })
          res.status(201).json({ products: response })
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

    static async editProduct(req, res) { 
        try {
            const { id } = req.params
            const {
                price,
                stock,
                title
            } = req.body

            const data = await Product.update({
                price,
                stock,
                title,
                updatedAt:new Date(),
            }, {
                where: {
                    id
                },
                returning: true,
                individualHooks: true
            })
            const userView = {
                id:data[1][0].id,
                title: data[1][0].title,
                price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data[1][0].price),
                stock: data[1][0].stock,
                CategoryId: data[1][0].CategoryId,
                createdAt: data[1][0].createdAt,
                updatedAt: data[1][0].updatedAt
            }
            res.status(201).json({product:userView})
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

    static async editCategory(req, res) { 
        try {
            const { id } = req.params
            const { CategoryId } = req.body
            const data = await Product.findOne({
                where:{id}
            })
            const category = await Category.findOne({
                where: {
                    id:CategoryId
                }
            })
            if (!category) {
                return res.status(404).json({
                  name: 'Data Not Found',
                  message: `Category With id ${CategoryId} not found`,
                });
            }
            data.CategoryId = parseInt(CategoryId)
            data.updatedAt = new Date()
            await data.save()
            const userView = {
                id: data.id,
                title: data.title,
                price: data.price,
                stock: data.stock,
                CategoryId: data.CategoryId,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            }
            res.status(201).json({product:userView})
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const validasiErorr = {};
                error.errors.map((er) => {
                    validasiErorr[er.path] = er.message;
                });
                return res.status(400).json({"error":validasiErorr});
            }else{
                res.status(error?.code || 500).json(error)
                console.log(error);
            }
        }
    }
    
    static async deleteCategory(req, res) { 
        try {
            const { id } = req.params
            const data = await Product.destroy({ where: { id } })
            res.status(200).json({message: 'Product has been successfully deleted'});
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const validasiErorr = {};
                error.errors.map((er) => {
                    validasiErorr[er.path] = er.message;
                });
                return res.status(400).json({"error":validasiErorr});
            }else{
                res.status(error?.code || 500).json(error)
                console.log(error);
            }
        }
    }
}

module.exports = productController