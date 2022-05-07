const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl')
mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTypology: true
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.get('/',async function (req, res) {
        const shortUrl = await shortUrl.find();
        res.render('index', { shortUrls: shortUrl });
    })
app.post('/shortUrls',async(req,res) => {
   await shortUrl.create({full: req.body.fullUrl})
   res.redirect("/")
})
app.get('/shortUrls',async(req,res) => {
    const shortUrl = await shortUrl.findOne({short:req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.click++
    shortUrl.save()
    res.redirect(shortUrl.full)
})
app.listen(process.env.PORT || 5000);