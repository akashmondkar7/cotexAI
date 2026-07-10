import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.get("/",(req,resp)=>{
  resp.json({message:"hello from Auth"})
})
app.listen(port, () => {
    console.log(`auth is started on port ${port}`);
});