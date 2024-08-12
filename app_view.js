const express = require('express');

const app = express();

app.listen(3001);

//register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.use((req, res) => {
    res.status(404).render('404');
});