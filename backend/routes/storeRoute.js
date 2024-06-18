import  express  from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { CreateStore, DeleteStore, GetMyStore, GetStoreDetails, GetStores, UpdateStore } from "../controllers/storeController.js";

const router = express.Router()

router.route('/stores').get(GetStores)
router.route('/my-store').get(verifyUser,GetMyStore)
router.route('/create-store').post(verifyUser,CreateStore)
router.route('/store/:id')
.get(GetStoreDetails)
.put(verifyUser,UpdateStore)
.delete(verifyUser,DeleteStore)




export default router;