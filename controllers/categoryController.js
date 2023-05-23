const {Category} = require('../models')

class categoryController {

    static async createCategory(req, res) {
        try {
            const { 
                type
            } = req.body
            const data = await Category.create({
                type
            })
            const response = {
                id: data.id,
                type: data.type,
                sold_product_amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.sold_product_amount),
                createdAt: new Date(),
                updatedAt: new Date()
            }

            res.status(201).json({ category: response })
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

    static async updateCategory(req, res) { 
        try {
            const { id } = req.params
            const { type } = req.body
            const result = await Category.update({
                type,
                updatedAt: new Date()
            }, {
                where: {
                    id
                },
                retruning: true,
                individualHooks: true
            })
            const userView = {
                id:result[1][0].id,
                type: result[1][0].type,
                sold_product_amount: result[1][0].sold_product_amount,
                createdAt: result[1][0].createdAt,
                updatedAt: result[1][0].updatedAt
            }
            res.status(201).json({ category: userView })
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

    static async deleteCategory(req, res) { 
        try {
            const { id } = req.params
            const result = await Category.destroy({
                where:{id}
            })
            return res.status(200).json({ message: 'Category has been successfully deleted' })
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


}

module.exports = categoryController