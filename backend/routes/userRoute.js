import express from "express"
import { registerUser,loginUser,logout,getUserDetails,updateProfile,getAllUsers , getSingleUser, deleteUser} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)  
router.route("/logout").get(logout);
router.route("/me").get(verifyUser,getUserDetails);
router.route("/me/update").put(verifyUser,updateProfile)

router.route("/admin/users")
.get(verifyAdmin,getAllUsers)

router.route("/admin/user/:id")
.get(verifyAdmin,getSingleUser)
.delete(verifyAdmin,deleteUser)

export default router;