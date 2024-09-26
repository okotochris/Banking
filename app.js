const express= require('express');
const nodemailer = require("nodemailer");
const signup = require('./model/signup.js')
const accDetails =require('./model/accnumbers.js')
const mongoose = require('mongoose')
const session = require('express-session') 

//initializing express
const app = express()

//express configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


//connecting to database mongodb
const dbUI = 'mongodb+srv://dennishoover4:hfU2qM2dmwROygTv@cluster0.h0trc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbUI)
.then(result=>{
  console.log('connect')
})
.catch(err=>{
  console.log(err)
})
//expression session
app.use(session(
  {
    secret: 'ehruenrir.5783%^',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
  }
))


//modemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "firstcarolinabank663@gmail.com",
      pass: "kqnj wvmm uxms adws",
    },
  });


//listening at port env or 3000
let PORT = process.env.PORT || 3000;
app.listen(PORT, (err) =>{
    if(err) console.log(err);
    else console.log(`listen at ${PORT}`)
})

//CHECKING IF USER HAS SIGN IN
function isAuthenticated(req, res, next){
 if(req.session.authenticated){
  next()
 }
 else{
  res.redirect('login')
 }

}

//HOME PAGE
app.get('/', isAuthenticated, (req, res)=>{
    const data = req.session.data
    res.render('index', {data})
})

//LOGIN PAGE
app.get('/login', (req, res)=>{
  res.render('login')
})

//SIGNIN PAGE
app.get('/signup', (req, res)=>{
  res.render('signup')
})

//SAVING SIGNIN DETAILS
app.post('/signUp', async (req, res)=>{
  try{
    const data = req.body;
    const newUser = new signup(data)
    await newUser.save()
    req.session.authenticated = true;
    req.session.data = data
    res.redirect('accnumbers')
  }
  catch(err){
    console.log(err)
  }

})

//
//saving account number
app.get('/accnumbers', isAuthenticated, (req, res)=>{
  res.render('accnumbers')
})
app.post('/accnumbers', isAuthenticated, async (req, res)=>{
  try{
    const data = req.body
    newData = new accDetails(data)
    await newData.save()
    res.redirect('accnumbers')
  }
  catch(err){
    console.log(err)
  }
})

//checking if user is authenticated
app.post('/banking', async (req, res)=>{
    let name = req.body.username;
    let password = req.body.password;
  try{
    const result = await signup.findOne({accNum: name, password: password}) 
    if(result){
      req.session.authenticated = true;
      req.session.data = result
      res.redirect('/')
    }
    else{
      res.render('loginw')
    }
  }
  catch(err){
    console.log(err)
  }

})

app.post('/email', (req, res)=>{
  const mailOptions = {
      from: req.body.email,  // sender address
      to: 'firstcarolinabank663@gmail.com',    // list of receivers
      subject: 'Customer at Carolina Bank', // Subject line
      
      html: `
          <p>Client Email: ${req.body.email}</p>
          <p>Client Name: ${req.body.clientName}</p>
          <p>${req.body.complain}</p>
          
      ` // HTML body
    };
    
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error occurred: ' + error.message);
      }
      console.log('Message sent: %s', info.messageId);
    });
    res.render('index')
})
app.get('/logout', (req, res)=>{
  req.session.destroy()
  res.redirect('login')
})

//geting account nmber from database 
app.get('/accountDetails', async (req, res)=>{
  let number = req.query.number
  try{
    let data = await accDetails.findOne({accNum: number})
    if(data){
      res.json(data)
    }
    else{
      res.json('')
    }
  }
  catch(err){
    console.log(err)
  }
})

//getting user transfer pin
app.get('/pin', async (req, res)=>{
  let pin = req.session.data;
  res.json(pin)
})