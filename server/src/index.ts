import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(_,res)=>{res.json({status:200,msg:"healthy"})});

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});