import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

// base setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
const URI = `mongodb+srv://tamim1:zaq12345@cluster0.j0ake.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// mongodb client
const client = new MongoClient(URI);

// main app
async function main() {
  try {
    await client.connect();
    // client ready

    app.get('/', (req, res) => {
      res.send('Tech King Api');
    });

    // ----------------------------------------- GETS
    app.get('/courses', async (req, res) => {
      const foods = await client
        .db('tech')
        .collection('courses')
        .find({})
        .toArray();
      res.json(foods);
    });
  } catch (error) {
    console.error(error);
  }
}

// listen server
app.listen(process.env.PORT || PORT);

// call main function
main().catch(console.dir);
