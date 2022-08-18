import jwt from 'jsonwebtoken'
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "not authenticated!"))
  }
  else {
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      if (err) {
        return next(createError(403, "Token is not valid!"))
      }
      else {
        req.user = user;
        next()
      }
    }
    )
  }
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res,  () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }else{
      if(err){
        return next(createError(403,"u r not authorized!"))
      }
    }
  })

}