const express= require('express');

//initializing express
const app = express()

//express configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

let PORT = process.env.PORT || 3000;

//listening at port env or 3000
app.listen(PORT, (err) =>{
    if(err) console.log(err);
    else console.log(`listen at ${PORT}`)
})


app.get('/', (req, res)=>{
    res.render('form')
})

//checking form
app.post('/form', (req, res)=>{
    let name = req.body.username;
    let password = req.body.password;
    console.log(name, password)
    if(password == '4455' && name=="6237193022"){
        res.render('index')
    }
    else res.json("invalid user")
})