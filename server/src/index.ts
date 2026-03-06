import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from "cors";
import mainRouter from './routes/index.js'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(express.json());

const PORT = process.env.PORT 
app.use("/v1",mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

