const {
    User,
    Product,
    Category,
    Transactionhistory,
} = require('../models')
  
class Authorization { 
    
    static async user(req, res, next) { 
        try {
            const UserId = req.params.id
            const authUser = req.UserData
            console.log(UserId, "< user")
            console.log(authUser, "< authUser")
            const user = await User.findOne({
                where: {
                  id: UserId,
                },
            })
            if (!user) {
                return res.status(404).json({
                  name: 'Data Not Found',
                  message: `User With id ${UserId} not found`,
                });
            }
            if (user.id === authUser.id) {
                return next();
            } else {
                return res.status(403).json({
                    name: 'Authorization Error',
                    message: `user with id ${authUser.id} do not have permission with id ${UserId}`,
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(err.message)
        }
    }
}

module.exports = Authorization