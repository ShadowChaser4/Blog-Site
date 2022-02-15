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

const content = [
  {
  title:'First',
  body: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gal"
  },
  {
    title: "Second",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];


// for index page
app.get('/', (req, res)=>{
  res.render('index',{contents: content} )

})


// for contact page
app.get('/contact', (req, res)=>{
  res.render('contact',{lorem: content[0].body})
})

//for about page
app.get('/about', (req, res)=>{
  res.render('about',{lorem: content[0].body})
})

//for compose
app.get('/compose', (req, res)=>{
  res.render('compose')
})

//post into compose
app.post('/compose', (req, res)=>{
  const post = {
    title: (req.body.Title),
    body: (req.body.ComposedString)
  }
  content.push(post);
  content.forEach((cont) => {
    console.log(cont.title)
  });

  res.redirect('/')
})
