const express= require('express');
const nodemailer = require("nodemailer");

//initializing express
const app = express()

//express configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

let PORT = process.env.PORT || 3000;


//modemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "firstcarolinabank663@gmail.com",
      pass: "kqnj wvmm uxms adws",
    },
  });


//listening at port env or 3000
app.listen(PORT, (err) =>{
    if(err) console.log(err);
    else console.log(`listen at ${PORT}`)
})


app.get('/', (req, res)=>{
    res.render('carolina')
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
//checking form
app.post('/banking', (req, res)=>{
    let name = req.body.username;
    let password = req.body.password;

    if(password == '4455' && name=="6237193022"){
        res.render('index')
    }
    else res.json("invalid user")
})
app.use((req, res)=>{
    res.render('carolina')
})