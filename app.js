const express = require("express");
const mongoose = require('mongoose');
const path = require("path"); 
const bodyparser = require('body-parser');
const { stringify } = require("querystring");
const { error } = require("console");
const app = express();
const port = 7000;

// Database Setup with the server thorugh mongoose with mongodbcompas
// mongoose.connect('mongodb://127.0.0.1:27017/Dance'); &#64;

const pass = "Asdfghjkl&#64;591"

const mongoURL = 'mongodb+srv://vkunal591:Asdfghjkl591@mrcoader.sp3kzac.mongodb.net/dance?retryWrites=true&w=majority';
mongoose.connect(mongoURL).then(
    console.log("mongoDB Cluster Conected")
).catch(error,(err)=>{
    console.log(err.message)
}
)

const contactdb = new mongoose.Schema({
    name: String,
    phone:Number,
    email:String,
    address:String,
    description:String,
    text:String
  });

  const contact = mongoose.model('contact', contactdb);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static(path.join(__dirname, 'static')));
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())
// app.use(express.json())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/home', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/classinfo', (req, res)=>{ 
    const params = { }
    res.status(200).render('classinfo.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var mydata= new contact(req.body);
    mydata.save().then(()=>{
        res.send("This Contact Has been Saved in DataBase!")
    }).catch(()=>{
        res.status(400).send("Item Was Not Saved IN DataBase")
    });
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});