const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://kushal_48:Test-123@cluster0.mnlpq.mongodb.net/blogDB?retryWrites=true&w=majority")



const blogSchema = {
  title : String,
  body : String
}




module.exports = mongoose.model('content', blogSchema);
