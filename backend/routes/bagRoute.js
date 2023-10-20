import  express  from "express";
import { addTobag, getBag, removeBagItem, updateBagItem } from "../controllers/bagController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.route('/add-to-bag').post(verifyUser,addTobag)
router.route('/bag/:id')
.get(verifyUser,getBag)
.delete(verifyUser,removeBagItem)
router.route('/update-bag-item').put(verifyUser,updateBagItem)



export default router;