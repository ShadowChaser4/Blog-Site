const express = require('express');
const app = express() ;
const bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'))



// setting up the server
app.listen(3000, ()=>{
  console.log('The server is listening in the port 3000')
});

const contentslist =[];
const first = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gal"

// for index page
app.get('/', (req, res)=>{
  res.render('index',{lorem: first} )
})

// for home page
app.get('/home', (req, res)=>{
  res.render('home',{lorem: first})
})

// for contact page
app.get('/contact', (req, res)=>{
  res.render('contact',{lorem: first})
})

//for about page
app.get('/about', (req, res)=>{
  res.render('about',{lorem: first})
})

//for compose
app.get('/compose', (req, res)=>{
  res.render('compose')
})

//post into compose
app.post('/compose', (req, res)=>{
  contentslist.push(req.body.ComposedString);
  console.log(contentslist)
  res.redirect('/compose')
})
