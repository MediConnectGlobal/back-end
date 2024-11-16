// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { UserModel } from "../model/user.js";
// import { AdminModel } from "../model/admin.js";
// import { StaffModel } from "../model/staff.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
});

// export const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.sendStatus(401); // Unauthorized
//     }
// };

export const hasPermission = (action) => {
    return async (req, res, next) => {
try {
    // find user from database
    const user = await UserModel.findById(req.auth.id);
    // Use the user role to find permission
    const permission = permissions.find(value => value.role === user.role);
    if(!permission){
        return res.status(403).json('No permission found!')
    }
    // Chech if permission action includes action
    if (permission.actions.includes(action)) {
        next();
    } else{
        res.status(403).json('Action not allowed!')
    }
            
} catch (error) {
    next( error)
    
}

    }
}


// export const hasAdminPermission = (action) => {
//     return async (req, res, next) => {
// try {
//     // find user from database
//     const admin = await AdminModel.findById(req.auth.id);
//     // Use the user role to find permission
//     const permission = permissions.find(value => value.role === admin.role);
//     if(!permission){
//         return res.status(403).json('No permission found!')
//     }
//     // Chech if permission action includes action
//     if (permission.actions.includes(action)) {
//         next();
//     } else{
//         res.status(403).json('Action not allowed!')
//     }
            
// } catch (error) {
//     next( error)
    
// }

//     }
// }

// export const hasStaffPermission = (action) => {
//     return async (req, res, next) => {
// try {
//     // find user from database
//     const staff = await StaffModel.findById(req.auth.id);
//     // Use the user role to find permission
//     const permission = permissions.find(value => value.role === staff.role);
//     if(!permission){
//         return res.status(403).json('No permission found!')
//     }
//     // Chech if permission action includes action
//     if (permission.actions.includes(action)) {
//         next();
//     } else{
//         res.status(403).json('Action not allowed!')
//     }
            
// } catch (error) {
//     next( error)
    
// }

//     }
// }
