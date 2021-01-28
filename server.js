if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require('mongoose')


// Connect DB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
      });
      console.log('DB CONNECTED');
    } catch (err) {
      console.log(err.message);
      // Exit process with failure
      process.exit(1);
    }
  };

connectDB()  


const expressLayout = require("express-ejs-layouts")


const IndexRouter = require('./routes/index')
app.use('/', IndexRouter)

app.set('view engine', 'ejs')
app.set('views', __dirname+ '/views')
app.set('layout', 'layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public'))


app.listen(process.env.PORT || 3000)