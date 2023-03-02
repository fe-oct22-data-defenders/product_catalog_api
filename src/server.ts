import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', express.json(), (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port} 🚀🚀🚀`);
});
