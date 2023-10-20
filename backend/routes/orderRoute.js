import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { newOrder,getSingleOrder,myOrder , getAllOrders , updateOrder, deleteOrder} from "../controllers/orderController.js";

const router = express.Router();

router.route("/order/new").post(verifyUser,newOrder)

router.route("/order/:id").get(verifyUser,getSingleOrder)

router.route("/orders/me").get(verifyUser,myOrder)

router.route("/admin/orders").get(verifyAdmin,getAllOrders)

router.route("/admin/order/:id").put(verifyAdmin,updateOrder).delete(verifyAdmin,deleteOrder)


export default router;