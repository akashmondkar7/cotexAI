import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use("/",router)


app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "hello from Auth" });
});

app.listen(port, () => {
  console.log(`auth is started on port ${port}`);
  connectDB();
});