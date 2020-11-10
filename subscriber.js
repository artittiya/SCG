var mqtt = require('mqtt');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

const MQTT_SERVER = "192.168.60.134";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = "kali"; 
const MQTT_PASSWORD = "kali";

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('test', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// รับข้อมูลจาก mqtt และ insert ลงฐานข้อมูล
client.on('message', function (topic, message) {
    // console.log(message.toString());
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = JSON.parse(message.toString());
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
});

