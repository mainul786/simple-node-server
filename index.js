const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello word!')
})

const users = [
    { id: 1, name: 'Najiya islam', email: 'najiyaislam320@gmail.com' },
    { id: 2, name: 'Nadira', email: 'nadira320@gmail.com' },
    { id: 3, name: 'mainul islam', email: 'mainulislam320@gmail.com' }
]

//database name:- userdb1
//password:--  9mstUD4lnAYdfi9s




const uri = "mongodb+srv://userdb1:9mstUD4lnAYdfi9s@cluster0.0vnziom.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        //const user = { name: 'Afiya', email: 'afiya@gmail.com' };

        //    const result = await userCollection.insertOne(user);
        //    console.log(result);

        app.get('/users', async(req, res)=>{
            const cursor = userCollection.find({})
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            console.log('post api created');
            // console.log(req.body)
            const user = req.body;
            //  user.id = users.length + 1;
            //  users.push(user);
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            res.send(user)

        })

    } finally {

    }
}
run().catch(console.dir);


app.get('/users', (req, res) => {

    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(urs => urs.name.toLocaleLowerCase().indexOf(search) >= 0)
        res.send(filtered)
    } else {
        res.send(users)
    }
})

// app.post('/users', (req, res)=>{
//     console.log('post api created');
//     console.log(req.body)
//     const user = req.body;
//      user.id = users.length + 1;
//      users.push(user);
//      res.send(user)

// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})