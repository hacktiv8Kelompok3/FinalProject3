const {User} = require('../models')

class UserController {
    static async register(req, res) {
        try {
            const {
                full_name,
                password,
                gender,
                email
            } = req.body

            const data = await User.create({
                full_name,
                email,
                password,
                gender,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            const response = {
                id: data.id,
                full_name: data.full_name,
                email: data.email,
                gender: data.gender,
                balance: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.balance),
            }
            res.status(200).send(response)
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

module.exports = UserController