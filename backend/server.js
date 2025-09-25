import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://ayucare-frontend.onrender.com",
      "https://ayucare-admin.onrender.com", // add admin origin
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING GREAT");
});

app.listen(port, () => console.log("Server Started", port));
