const express = require("express");
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const portNum = 3000;
const nowYear = new Date().getFullYear();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  let log = `Http Request ${req.method} = ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err)
      console.log('Unable to append to Server log');
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return nowYear;
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send('<b>Hello There...</b>');
    res.render('home.hbs',{
      name:'Wesley Too',
      htmlTitle:'Home',
      pageTitle:'This is HomePage',
      contents:'Home Contents'});
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'This is AboutPage'
  });
});

app.get('/bad',(req,res)=>{
  res.send({err:'Bad Request'});
});

var server = app.listen(portNum,()=>{
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s",host,port);
});
