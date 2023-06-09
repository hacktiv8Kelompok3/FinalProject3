const {User} = require('../models')
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
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

    static async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw {
                    code: 404,
                    message: 'User not found'
                }
            }
            const isCorrect = comparePassword(password, user.password)
            if (!isCorrect) {
                throw {
                  code: 401,
                  message: "Incorrect password"
                }
            }
            const response = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = generateToken(response)
            res.status(200).json({token})
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
    
    static async updateUser(req, res) { 
        try {
            const { full_name, email } = req.body
            const result = await User.update({
                full_name,
                email,
            }, {
                where: {
                    id:req.UserData.id
                },
                retruning: true,
                individualHooks: true
            })
            const userView = {
                email:result[1][0].email,
                full_name: result[1][0].full_name,
            }
            res.status(200).json(userView)
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

    static async deleteUser(req, res) { 
        try {
            const result = await User.destroy({
                where: { 
                    id:req.UserData.id
                 }
            })
            if (!result) {
                throw {
                  code: 404,
                  message: "Data not found!"
                }
            }
            res.status(201).json({message:`Delete id ${req.UserData.id} success!`})
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

    static async topUp(req, res) { 
        try {
            const { balance } = req.body
            const user = await User.findOne({where: {id: req.UserData.id}})
            user.balance += parseInt(balance)
            await user.save()
            const idrBalance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user.balance)

            res.status(201).json({
                message: `Your balance has been successfully updated to ${idrBalance}`,
            })

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