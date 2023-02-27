import express from 'express';
import cors from 'cors';

const PORT = 8000;

const users = [
  { id: 1, name: 'Joe Biden', carColorId: 5 },
  { id: 2, name: 'Elon Musk', carColorId: 4 },
  { id: 3, name: 'Pan Roman', carColorId: 2 },
];

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`API is ready on http://localhost:${PORT} 🚀🚀🚀`);
});
