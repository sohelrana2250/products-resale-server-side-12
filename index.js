const express = require('express');
const app = express();
const port = process.env.PORT || 5010;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//meddile-were
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://phoneresale:8W7xxe9Tlln9ICjZ@cluster0.wqhd5vt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//username: phoneresale
//password: 8W7xxe9Tlln9ICjZ
//databasename: PhoneResale
//collectionname: phoneCategory




/*client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});*/

async function run() {

    try {

        const categoryCollection = client.db("PhoneResale").collection("phoneCategory");
        //phoneDeatils
        const phonedeailsCollection = client.db("PhoneResale").collection("phoneDeatils");
        const bookingCollection = client.db("PhoneResale").collection("booking");
        app.get('/phoneCategory', async (req, res) => {

            const query = {};
            const cursor = categoryCollection.find(query);
            const result = await cursor.toArray();

            res.send(result);

        })

        app.get('/allPhoneDeails', async (req, res) => {

            const query = {};

            const cursor = phonedeailsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/allPhoneDeails/:id', async (req, res) => {

            const id = req.params.id;

            //console.log(id);


            const query = { categoryID: id };

            const cursor = phonedeailsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/allPhoneDeails', async (req, res) => {

            const addPhone = req.body;
            const result = await phonedeailsCollection.insertOne(addPhone);
            res.send(result);


        })

        app.get('/MyProduct', async (req, res) => {


            const email = req.query.email;
            const query = { email: email };
            const result = await phonedeailsCollection.find(query).toArray();
            res.send(result);


        })

        app.delete('/MyProduct/:id', async (req, res) => {

            const id = req.params.id;

            // console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await phonedeailsCollection.deleteOne(query);
            console.log(result);
            res.send(result);




        })

        app.post('/booking', async (req, res) => {

            const bookingData = req.body;
            const result = await bookingCollection.insertOne(bookingData);
            // console.log(result);
            res.send(result);



        })

        app.get('/booking', async (req, res) => {

            const email = req.query.email;

            const query = { email: email };
            const result = await bookingCollection.find(query).toArray();
            res.send(result);


        })





    }
    finally {

    }

}






app.get('/', (req, res) => {
    res.send('used-products-resale-server');
})

run().catch((error) => {
    console.log(error.message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})