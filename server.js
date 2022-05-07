const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
const port = process.env.PORT || 8000;
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
app.listen(port, ()=>{
    console.log('listening on port ${port}')
});