import express from 'express';
import cors from 'cors';
import { router as phoneDetailsRouter } from '../src/routes/phoneDetails';
import { router as phonesRouter } from '../src/routes/phones';
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product_details', phoneDetailsRouter);
app.use('/products', phonesRouter);

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port} 🚀🚀🚀`);
});
