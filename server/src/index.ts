import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from "cors";
import mainRouter from './routes/index.js'
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT 
app.use("/v1",mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

