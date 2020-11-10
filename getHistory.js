const express = require('express');
var MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.json());

var url = "mongodb://localhost:27017/";

var customers;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
        if (err) throw err;
        customers = result;
        // console.log(result);
        db.close();
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello Fucking World</h1>');
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port} ...`) );