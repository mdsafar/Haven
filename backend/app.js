import "dotenv/config"
import express from "express";
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import bag from "./routes/bagRoute.js"
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


const app = express();
const corsOption = {
  origin: true,
  credentials: true
}
app.use(cors(corsOption))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

app.use(fileUpload());
app.use(cookieParser())


app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", bag)

export default app;