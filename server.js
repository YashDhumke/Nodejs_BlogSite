const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/blog', {useNewUrlParser: true, useUnifiedTopology: true, })

const app = express()
app.use(express.urlencoded({ extended: false }))   // express la articles access karta yenyasathi
const articleRouter = require('./routes/articles')   




app.use('/articles',articleRouter)

// setting ejs as a view engine

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');

// routing 
app.get('/', async (req,res)=>{

    const articles = await Article.find().sort({
        createdAt:'desc'
        // sagle articles display karnayasathi te pan descending order ne ..
    })
    // response madhe index.js hi file render keli ahe
    res.render('articles/index', {articles: articles});  // he pass kelele objects index page madhe dynamically render kele jatat ejs throug..
})


app.listen(5000);