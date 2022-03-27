const express = require('express');
const app = express() ;
const bodyparser = require('body-parser');
const lodash = require('lodash');
const content = require(__dirname+"/mongm.js")
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'))


mongoose.connect("mongodb+srv://kushal_48:Test-123@cluster0.mnlpq.mongodb.net/blogDB?retryWrites=true&w=majority")


// setting up the server
app.listen(3000, ()=>{
  console.log('The server is listening in the port 3000')
});

const start= [
  {
  title:'first',
  body: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gal"
  },
 {
    title: "second",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];




// for index page
app.get('/', (req, res)=>{
content.find({}, (err, docs)=>{
  if (!err)
  {
    if (docs == null)
    {
      content.insertMany(start, (err, docs)=>{
        console.log(err);
        console.log(docs);
        res.render("index.ejs", {contents: docs})
      })
    }
    res.render("index.ejs", {contents: docs})
  }
})

})

// for other pages
app.get('/post/:postname', (req, res)=>{
const  requestedtitle = (req.params.postname)

content.findOne({title: requestedtitle}, (err, foundlist)=>{
  if(!err)
  {

     if (foundlist != null){
       //  res.send(foundlist)
       res.render('post', {contents: foundlist})
     }
     else{
       res.send('not found')
     }

      console.log(foundlist)

  }
})

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
  const post = content.create({
    title: (req.body.Title),
    body: (req.body.ComposedString)
  })


  res.redirect('/compose')
})


app.get('/delete/:todelete', (req, res)=>{
  const todelete = req.params.todelete;
try{
  content.deleteOne({title: todelete}, (err)=>{
    console.log(err)
    res.send('deleted')
  })
}
catch(e)
{
  res.send(e)
}

})
