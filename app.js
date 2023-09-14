const express = require("express");
const path = require("path")
const port = 8000;
const app = express();  
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);


//Express specific 
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded());

//Pug specific
app.set('view engine', 'pug')// Setting the template as pug
app.set('views', path.join(__dirname, 'views')) //Setting the views directory

//Endpoints
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('index.pug',params);
})

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item have been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

app.get('/home', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug',params );
})
//Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})