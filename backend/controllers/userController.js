import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const registerUser = async (req, res) => {
    try {
        
        const { name, email } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const user = new User({
            name,
            email,
            password: hash,
        })


        await user.save()

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );


         res.cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });    
       
        return res.status(200).json({
            success: true,
            message: "Successfully Registered",
            user,
            token,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Register. Please try again.",
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
           return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        bcrypt.compare(req.body.password, user.password).then((CheckPassword) => {
            if (!CheckPassword) {
               return res.status(401).json({
                    success: false,
                    message: "Incorrect Email or Password"
                })
            }
            const { password, role , ...rest } = user._doc

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "15d" }
            )
    

         return res.cookie("accessToken", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            }).status(200).json({
                success: true,
                message: "Successfully Login",
                user,
                token,
            })
            
        })

    } catch (err) {
      return  res.status(500).json({
            success: false,
            message: "Failed to Login. Try again"
        })
    }
}

export const logout = (req, res) => {
    res.cookie("accessToken", null, {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
    }).status(200).json({
        success: true,
        message: "Logged Out",
    });
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Load"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {

       const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true, useFindAndModify: false })

        res.status(200).json({
            success: true,
            message: "Updated",
            user
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            success: false,
            message: "Failed to Update"
        })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})

        return res.status(200).json({
            success: true,
            users
        })

    } catch (err) {
        return res.status(404).json({
            success: false,
            message: "Failed to get"
        })
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not exist with id ${req.params.id}`
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not exist with id ${req.params.id}`
            })
        }
        
        await user.deleteOne()

        return res.status(200).json({
            success: true,
            message: `User ${user.name} Deleted`
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Failed to get"
        })
    }
}