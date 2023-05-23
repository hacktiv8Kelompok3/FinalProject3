const {
    User,
    Product,
    Category,
    Transactionhistory,
} = require('../models')
  
class Authorization { 
    static async admin(req, res, next) { 
        const authUser = req.UserData
        if (authUser.role !== 'admin') { 
            return res.status(403).json({
                name: 'Authorization Error',
                message: `User With role ${authUser.role} does not have permission`,
              })
        } else {
            return next()
        }
    }
    static async user(req, res, next) { 
        try {
            const authUser = req.UserData.id
            console.log(authUser, "< authUser")
            const user = await User.findOne({
                where: {
                  id: req.UserData.id,
                },
            })
            if (!user) {
                return res.status(404).json({
                  name: 'Data Not Found',
                  message: `User With id ${user.id} not found`,
                });
            }
            if (user.id === authUser) {
                return next();
            } else {
                return res.status(403).json({
                    name: 'Authorization Error',
                    message: `user with id ${authUser} do not have permission with id ${user.id}`,
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(err.message)
        }
    }
    static async categories(req, res, next) { 
        try {
            const { id } = req.params
            const category = await Category.findOne({
                where: {
                    id:id
                }
            })
            if (!category) {
                return res.status(404).json({
                  name: 'Data Not Found',
                  message: `Category With id ${id} not found`,
                });
              }else {
                return next();
              }
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
}

module.exports = Authorization