const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers

    if (!token) {
      throw {
        code: 401,
        message: "Token not provided!"
      }
    }

    const decode = verifyToken(token)

    console.log(decode, "<< decode token");

    const user = await User.findOne({
      where: {
        id: decode.id,
        email: decode.email,
        role:decode.role
      }
    })

    if (!user) {
      throw{
        code: 401,
        message: `User with id ${decode.id} not found in database`
      }
    }

    req.UserData = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    
    next()
  } catch (error) {
      res.status(error?.code || 500).json(error)
      console.log(error)
  }
}

module.exports = authentication 