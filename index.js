'use strict';

const path=require('path');

const http=require('http');
const express=require('express');
const app= express();
const {port,host,storage}=require('./serverConfig.json');

const Datastorage = require(path.join(
    __dirname,
    storage.storageFolder,
    storage.dataLayer
  ));

const dataStorage = new Datastorage();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");
app.get("/", (req, res) => res.sendFile(menuPath));
app.get('/all',(req,res)=>dataStorage.getAll().then((data)=>{
  res.render('all',{results:data})
}))
app.get('/getBook',(req,res)=>res.render('getBook',
{title:'Get book',
header:'Get book',
action:'/getBook'}))

app.post("/getBook", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const bookId = req.body.bookID;
  console.log(bookId);
  dataStorage
    .getOne(bookId)
    .then((book) => res.render("bookPage", { result: book }))
    .catch((error) => sendErrorpage(res, error));
});

app.get('/inputform',(req,res)=>{
  res.render('form',{
    title:'Add book',
    header:'Add a book',
    action:'/insert',
    bookID:{value:'',readonly:''},
    name:{value:'',readonly:''},
    author:{value:'',readonly:''},
    topic:{value:'',readonly:''},
    numberOfBooks:{value:'',readonly:''},
  })
})

app.post('/insert',(req,res)=>{
  if(!req.body) sendStatus(500);
  console.log(req.body);
  dataStorage.insert(req.body)
  .then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorpage(res,error));
})

app.get('/updateform',(req,res)=>res.render('form',{
  title:'Update book',
  header:'Update Book details',
  action:'/updatedata',
  bookID:{value:'',readonly:''},
  name:{value:'',readonly:'readonly'},
  author:{value:'',readonly:'readonly'},
  topic:{value:'',readonly:'readonly'},
  numberOfBooks:{value:'',readonly:'readonly'},
}));

app.post('/updatedata',(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.getOne(req.body.bookID).then(book=> res.render('form',{
    title:'Update book',
    header:'Update book',
    action:'/update',
    bookID:{value:book.bookID,readonly:'readonly'},
    name:{value:book.name,readonly:''},
author:{value:book.author,readonly:''},
topic:{value:book.topic,readonly:''},
numberOfBooks:{value:book.numberOfBooks,readonly:''},

  })).catch(error=>sendErrorpage(res,error));
})
app.post('/update',(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.update(req.body)
  .then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorpage(res,error));
})

app.get('/removeBook',(req,res)=>res.render('getBook',
{title:'Remove book',
header:'Remove book',
action:'/removeBook'}))


app.post('/removeBook',(req,res)=>{
  if(!req.body) sendStatus(500);
  console.log(req.body);
  const bookID=req.body.bookID;
  console.log(bookID);
  dataStorage.remove(bookID).then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorpage(res,error));
})
server.listen(port, host, () => console.log(`${host}:${port} is listening`));

function sendErrorpage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = "status", header = "status") {
  return res.render("statusPage", {
    title: title,
    header: header,
    status: status,
  });
}